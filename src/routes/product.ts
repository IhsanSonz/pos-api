import { Router, Request, Response, NextFunction } from 'express';
import Product from '../models/Product';
import { formatResponse } from '../util/formatResponse';
import mongoose from 'mongoose';
import joiMiddleware from '../middlewares/joiMiddleware';

const products = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allProducts = await Product.find({});

    formatResponse(res, allProducts);
  } catch (error: any) {
    next(error);
  }
};

const product = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      res.status(400);
      throw new Error('Product not found');
    }

    formatResponse(res, product.toObject());
  } catch (error: any) {
    next(error);
  }
};

const store = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      category: req.body.category as mongoose.Types.ObjectId,
    });

    formatResponse(res, product.toObject());
  } catch (error: any) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        category: req.body.category as mongoose.Types.ObjectId,
      },
      { new: true },
    );

    formatResponse(res, product?.toObject());
  } catch (error: any) {
    next(error);
  }
};

const downloadUpsert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(400);
    formatResponse(res, {}, 'On development', false);
  } catch (error: any) {
    next(error);
  }
};

const uploadUpsert = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(400);
    formatResponse(res, {}, 'On development', false);
  } catch (error: any) {
    next(error);
  }
};

const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    formatResponse(res, {});
  } catch (error) {
    next(error);
  }
};

export const handleProductRoutes = () => {
  const router = Router();

  router.get('/all', products);
  router.get('/:id', joiMiddleware('validate_id', 'params'), product);
  router.post('/store', joiMiddleware('product.index'), store);
  router.put('/:id/update', joiMiddleware('validate_id', 'params'), joiMiddleware('product.index'), update);
  router.delete('/:id/destroy', joiMiddleware('validate_id', 'params'), destroy);
  router.get('/download-upsert', downloadUpsert);
  router.post('/upload-upsert', uploadUpsert);

  return router;
};
