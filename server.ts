import serverlessExpress from '@codegenie/serverless-express';
import { app } from './src/index';

// Export lambda handler
export const handler = serverlessExpress({ app });
