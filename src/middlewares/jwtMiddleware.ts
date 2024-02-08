import { NextFunction, Request, Response } from 'express';
import { verifyAccessToken, verifyRefreshToken } from '../util/jwt';
import { Jwtpayload } from '../types/jwtPayload';
import User from '../models/User';

export const jwtMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    const token = authHeader.split(' ')[1];

    const payload =
      req.originalUrl === '/api/auth/refresh'
        ? (verifyRefreshToken(token) as Jwtpayload)
        : (verifyAccessToken(token) as Jwtpayload);

    if (!payload) {
      res.status(403);
      throw new Error('Forbidden');
    }

    const user = await User.findOne({
      _id: payload.id,
    });

    if (!user || !user.refreshToken) {
      res.status(403);
      throw new Error('Forbidden');
    }

    res.locals.user = user;
    next();
  } catch (error: any) {
    next(error);
  }
};
