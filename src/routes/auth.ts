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
    console.log(allUsers);
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

    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user) {
      throw new Error('User already exists');
    }

    const newUser = new User({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
      },
    });

    const tokenPayload: Jwtpayload = {
      id: newUser.id,
      email: newUser.email,
    };
    const tokens = createUserToken(tokenPayload);
    await updateRefreshToken(newUser.id, tokens.refreshToken);
    formatResponse(res, { ...newUser, tokens });
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
