import { Router, Request, Response, NextFunction } from 'express';
import Tag from '../models/Tag';
import { formatResponse } from '../util/formatResponse';
import mongoose from 'mongoose';
import joiMiddleware from '../middlewares/joiMiddleware';

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
    const tag = await Tag.findOne({
      _id: req.params.id,
    });

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
      tag: req.body.tag as mongoose.Types.ObjectId,
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
        tag: req.body.tag as mongoose.Types.ObjectId,
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
  } catch (error) {
    next(error);
  }
};

export const handleTagRoutes = () => {
  const router = Router();

  router.get('/all', tags);
  router.get('/:id', joiMiddleware('validate_id', 'params'), tag);
  router.post('/store', joiMiddleware('tag.index'), store);
  router.put('/:id/update', joiMiddleware('validate_id', 'params'), joiMiddleware('tag.index'), update);
  router.delete('/:id/destroy', joiMiddleware('validate_id', 'params'), destroy);

  return router;
};
