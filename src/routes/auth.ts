import { Router, Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import { formatResponse } from '../util/formatResponse';
import User from '../models/User';
import { Jwtpayload } from '../types/jwtPayload';
import { createUserToken } from '../util/jwt';
import validateRegisterInput from '../validation/users/register';

const users = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allUsers = await User.find({});
    formatResponse(res, allUsers);
  } catch (error: any) {
    next(error);
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      res.status(404);
      throw new Error(errors.name || errors.username || errors.password);
    }

    const checkUser = await User.findOne({
      username: req.body.username,
    });

    if (checkUser) {
      throw new Error('User already exists');
    }

    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    const resUser = await newUser.save();
    const { password, ...user } = resUser.toObject();

    const tokenPayload: Jwtpayload = {
      id: newUser.id,
      username: newUser.username,
    };
    const tokens = createUserToken(tokenPayload);
    await updateRefreshToken(newUser.id, tokens.refreshToken);
    formatResponse(res, { ...user, tokens });
  } catch (error: any) {
    next(error);
  }
};

export const updateRefreshToken = async (userId: string, refreshToken?: string) => {
  await User.updateOne({
    where: {
      id: userId,
    },
    data: {
      refreshToken: refreshToken ?? null,
    },
  });
};

export const handlleAuthRoutes = () => {
  const router = Router();

  router.get('/users', users);
  router.post('/register', register);

  return router;
};
