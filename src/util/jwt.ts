import jwt from 'jsonwebtoken';

import { Jwtpayload } from '../types/jwtPayload';
import { Tokens } from '../types/tokens';

export const generateToken = (data: object, expirationTime: number, secret: string): string => {
  return jwt.sign(data, secret, {
    expiresIn: expirationTime,
  });
};

const generateAccessToken = (data: object): string => {
  return generateToken(data, 60 * 60 * 24 * 3, process.env.JWT_ACCESS_SECRET as string);
};

const generateRefreshToken = (data: object): string => {
  return generateToken(data, 60 * 60 * 24 * 30, process.env.JWT_REFRESH_SECRET as string);
};

export const createUserToken = (data: Jwtpayload): Tokens => {
  return {
    accessToken: generateAccessToken(data),
    refreshToken: generateRefreshToken(data),
  };
};

const verifyToken = (token: string, secret: string) => {
  const payload = jwt.verify(token, secret);
  if (!payload) {
    return;
  }

  return payload;
};

export const verifyAccessToken = (token: string) => {
  return verifyToken(token, process.env.JWT_ACCESS_SECRET as string);
};

export const verifyRefreshToken = (token: string) => {
  return verifyToken(token, process.env.JWT_REFRESH_SECRET as string);
};
