import { Router, Request, Response, NextFunction } from 'express';
import Tag, { TmpTag } from '../models/Tag';
import { formatResponse } from '../util/formatResponse';
import mongoose, { startSession } from 'mongoose';
import joiMiddleware from '../middlewares/joiMiddleware';
import multer from 'multer';
import * as fastCSV from 'fast-csv';
import * as fs from 'fs';
import { joiObjectIdSchema } from '../util/joi';

const tags = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allTags = await Tag.find({});

    formatResponse(res, allTags);
  } catch (error: any) {
    next(error);
  }
};

const tag = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tag = await Tag.findById(req.params.id);

    if (!tag) {
      res.status(400);
      throw new Error('tag not found');
    }

    formatResponse(res, tag.toObject());
  } catch (error: any) {
    next(error);
  }
};

const store = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tag = await Tag.create({
      name: req.body.name,
    });

    formatResponse(res, tag.toObject());
  } catch (error: any) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tag = await Tag.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
      },
      { new: true },
    );

    formatResponse(res, tag?.toObject());
  } catch (error: any) {
    next(error);
  }
};

const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Tag.findByIdAndDelete(req.params.id);

    formatResponse(res, {});
  } catch (error: any) {
    next(error);
  }
};

const downloadUpsert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tags = await Tag.countDocuments({});

    if (!tags) {
      res.status(400);
      throw new Error('Tags data is empty');
    }

    const cursor = Tag.find({}).cursor();

    const transformer = (doc: any) => {
      return {
        id: doc._id,
        name: doc.name,
      };
    };

    const filename = 'tags.csv';

    res.setHeader('Content-disposition', `attachment; filename=${filename}`);
    res.writeHead(200, { 'Content-Type': 'text/csv' });

    res.flushHeaders();

    const csvStream = fastCSV.format({ headers: true }).transform(transformer);
    cursor.pipe(csvStream).pipe(res);
  } catch (error: any) {
    next(error);
  }
};

const uploadUpsert = async (req: Request, res: Response, next: NextFunction) => {
  const session = await TmpTag.startSession();
  session.startTransaction();
  try {
    if (!req.file) {
      res.status(400);
      throw new Error('No uploaded file is found');
    }
    const csv = req.file.path;
    const { data, error } = await parseCSV(csv);

    if (error) {
      res.status(400);
      throw new Error('Something wrong while parsing the CSV');
    }

    let isError = false;
    for (const tag of data) {
      let id = null;
      if (tag.id) {
        const { error } = joiObjectIdSchema.validate({ id: tag.id });
        if (error) {
          isError = true;
        } else {
          id = new mongoose.Types.ObjectId(tag.id);
        }
      }

      const filter = id ? { _id: id } : { name: tag.name };

      await TmpTag.updateOne(filter, { name: tag.name }, { upsert: true });
    }

    if (isError) {
      res.status(400);
      throw new Error('Something wrong while parsing the CSV');
    }

    await session.commitTransaction();
    session.endSession();

    formatResponse(res, {});
  } catch (error: any) {
    console.log(error);
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

const parseCSV = async (csv: string) => {
  let res: { data: { id: string | undefined; name: string }[]; error?: Error } = { data: [] };

  await new Promise((resolve) => {
    fs.createReadStream(csv)
      .pipe(fastCSV.parse({ headers: true }))
      .on('data', (row: any) => res.data.push(row))
      .on('error', (error) => {
        res.error = error;
      })
      .on('end', () => {
        fs.unlinkSync(csv);
        resolve(true);
      });
  });

  return res;
};

export const handleTagRoutes = () => {
  const router = Router();
  const upload = multer({ dest: 'uploads/' });

  router.get('/all', tags);
  router.get('/:id(^[0-9a-fA-F]{24}$)', joiMiddleware('validate_id', 'params'), tag);
  router.post('/store', joiMiddleware('tag.index'), store);
  router.put('/:id/update', joiMiddleware('validate_id', 'params'), joiMiddleware('tag.index'), update);
  router.delete('/:id/destroy', joiMiddleware('validate_id', 'params'), destroy);
  router.get('/download-upsert', downloadUpsert);
  router.post('/upload-upsert', upload.single('csv'), uploadUpsert);

  return router;
};
