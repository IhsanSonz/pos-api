import { Router, Request, Response, NextFunction } from 'express';
import Product from '../models/Product';
import { formatResponse } from '../util/formatResponse';
import { storeValidation, updateValidation } from '../validation/product';
import mongoose from 'mongoose';

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
    const product = await Product.findOne({
      id: req.params.id,
    });

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
    await storeValidation(req);

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
    await updateValidation(req);

    const product = await Product.findOneAndUpdate(
      { _id: req.params.id },
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
  router.get('/:id', product);
  router.post('/store', store);
  router.put('/:id/update', update);
  router.delete('/:id/destroy', destroy);
  router.get('/download-upsert', downloadUpsert);
  router.post('/upload-upsert', uploadUpsert);

  return router;
};
