import { Router } from 'express';
import { handleAuthRoutes } from './routes/auth';
import { handleProductRoutes } from './routes/product';
import { jwtMiddleware } from './middlewares/jwtMiddleware';

export const handleRoutes = () => {
  const router = Router();

  router.use('/auth', handleAuthRoutes());
  router.use('/product', jwtMiddleware, handleProductRoutes());

  return router;
};
