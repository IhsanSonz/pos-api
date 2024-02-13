import { Router } from 'express';
import { handleAuthRoutes } from './routes/auth';
import { handleProductRoutes } from './routes/product';
import { jwtMiddleware } from './middlewares/jwtMiddleware';
import { handleCategoryRoutes } from './routes/category';
import { handleTagRoutes } from './routes/tag';

export const handleRoutes = () => {
  const router = Router();

  router.use('/auth', handleAuthRoutes());
  router.use('/product', jwtMiddleware, handleProductRoutes());
  router.use('/category', jwtMiddleware, handleCategoryRoutes());
  router.use('/tag', jwtMiddleware, handleTagRoutes());

  return router;
};
