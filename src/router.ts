import { Router } from 'express';
import { handlleAuthRoutes } from './routes/auth';

export const handleRoutes = () => {
  const router = Router();

  router.use('/auth', handlleAuthRoutes());

  return router;
};
