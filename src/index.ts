import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { connect } from 'mongoose';
import { handleRoutes } from './router';
import { errorHandler } from './middlewares/errorHandler';

const api = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  connect(process.env.MONGO_URI as string)
    .then(() => console.log('mongoDB Connected'))
    .catch((err) => console.log(err));

  app.get('/', (_, res) => {
    return res.send({
      message: 'Go Serverless v3.0! Your function executed successfully!',
    });
  });

  app.use('/api', handleRoutes());

  app.use(errorHandler);

  return app;
};

export default api;
