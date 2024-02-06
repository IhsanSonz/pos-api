import jwt from 'jsonwebtoken';

export interface Jwtpayload extends jwt.JwtPayload {
  id: string;
  username: string;
}
