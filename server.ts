/* example using https://github.com/dougmoscrop/serverless-http */
import { createServer, proxy } from 'aws-serverless-express';
import api from './src/index';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';

// Initialize express app
const app = api();
const server = createServer(app);

// Export lambda handler
export const handler = (event: APIGatewayProxyEvent, context: Context) => {
  return proxy(server, event, context);
};
