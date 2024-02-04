import 'dotenv/config';
import express, { Router } from 'express';
import { connect } from 'mongoose';
import { handleRoutes } from './router';
import { errorHandler } from './middlewares/errorHandler';

const startServer = async () => {
  const app = express();
  const PORT = process.env.PORT || 3010;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });

  app.get('/', (req, res) => {
    res.send('Hello World');
  });

  app.use('/api', handleRoutes());

  app.use(errorHandler);
};

startServer();
