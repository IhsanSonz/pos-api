import { Request, Response, NextFunction } from 'express';
import { formatResponse } from '../util/formatResponse';

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (res.statusCode === 200) {
    res.status(500);
  }

  if (process.env.NODE_ENV == 'development') console.error(err);
  formatResponse(res, err, err.message, false);
};
