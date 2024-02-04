/* example using https://github.com/dougmoscrop/serverless-http */
import { createServer, proxy } from 'aws-serverless-express';
import api from './src/index';

// Initialize express app
const app = api();
const server = createServer(app);

// Export lambda handler
export const handler = (event, context) => {
  return proxy(server, event, context);
};
