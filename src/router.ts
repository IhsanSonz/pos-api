import { Router } from 'express';
import { handleAuthRoutes } from './routes/auth';
import { handleProductRoutes } from './routes/product';
import { jwtMiddleware } from './middlewares/jwtMiddleware';
import { handleCategoryRoutes } from './routes/category';

export const handleRoutes = () => {
  const router = Router();

  router.use('/auth', handleAuthRoutes());
  router.use('/product', jwtMiddleware, handleProductRoutes());
  router.use('/category', jwtMiddleware, handleCategoryRoutes());

  return router;
};
