import { Router, Request, Response, NextFunction } from 'express';
import Category from '../models/Category';
import { formatResponse } from '../util/formatResponse';
import { storeValidation, updateValidation } from '../validation/category';
import mongoose from 'mongoose';

const categories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allCategories = await Category.find({});

    formatResponse(res, allCategories);
  } catch (error: any) {
    next(error);
  }
};

const category = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await Category.findOne({
      id: req.params.id,
    });

    if (!category) {
      res.status(400);
      throw new Error('category not found');
    }

    formatResponse(res, category.toObject());
  } catch (error: any) {
    next(error);
  }
};

const store = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await storeValidation(req);

    const category = await Category.create({
      name: req.body.name,
      category: req.body.category as mongoose.Types.ObjectId,
    });

    formatResponse(res, category.toObject());
  } catch (error: any) {
    next(error);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await updateValidation(req);

    const category = await Category.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        category: req.body.category as mongoose.Types.ObjectId,
      },
      { new: true },
    );

    formatResponse(res, category?.toObject());
  } catch (error: any) {
    next(error);
  }
};

export const handleCategoryRoutes = () => {
  const router = Router();

  router.get('/all', categories);
  router.get('/:id', category);
  router.post('/store', store);
  router.put('/:id/update', update);

  return router;
};
