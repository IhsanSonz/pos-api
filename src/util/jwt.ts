import jwt from 'jsonwebtoken';

import { Jwtpayload } from '../types/jwtPayload';
import { Tokens } from '../types/tokens';

export const generateToken = (data: object, expirationTime: number, secret: string): string => {
  return jwt.sign(data, secret, {
    expiresIn: expirationTime,
  });
};

const generateAccessToken = (data: object): string => {
  return generateToken(data, 60 * 60 * 24 * 3, process.env.JWT_SECRET as string);
};

const generateRefreshToken = (data: object): string => {
  return generateToken(data, 60 * 60 * 24 * 30, process.env.JWT_ACCESS_SECRET as string);
};

export const createUserToken = (data: Jwtpayload): Tokens => {
  return {
    accessToken: generateAccessToken(data),
    refreshToken: generateRefreshToken(data),
  };
};

export const verifyToken = (token: string) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET as string);
  if (!payload) {
    return;
  }

  return payload;
};
