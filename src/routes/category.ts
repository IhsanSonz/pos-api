import { Router, Request, Response, NextFunction } from 'express';
import Category from '../models/Category';
import { formatResponse } from '../util/formatResponse';
import mongoose from 'mongoose';
import joiMiddleware from '../middlewares/joiMiddleware';

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
    const category = await Category.findById(req.params.id);

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
    const category = await Category.findByIdAndUpdate(
      req.params.id,
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

const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Category.findByIdAndDelete(req.params.id);

    formatResponse(res, {});
  } catch (error) {
    next(error);
  }
};

export const handleCategoryRoutes = () => {
  const router = Router();

  router.get('/all', categories);
  router.get('/:id', joiMiddleware('validate_id', 'params'), category);
  router.post('/store', joiMiddleware('category.index'), store);
  router.put('/:id/update', joiMiddleware('validate_id', 'params'), joiMiddleware('category.index'), update);
  router.delete('/:id/destroy', joiMiddleware('validate_id', 'params'), destroy);

  return router;
};
