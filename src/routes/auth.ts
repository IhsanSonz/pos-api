import { Router, Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import { formatResponse } from '../util/formatResponse';
import User from '../models/User';
import { Jwtpayload } from '../types/jwtPayload';
import { createUserToken } from '../util/jwt';
import validateRegisterInput from '../validation/users/register';
import validateLoginInput from '../validation/users/login';
import { jwtMiddleware } from '../middlewares/jwtMiddleware';

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
      res.status(400);
      throw new Error(errors.name || errors.username || errors.password);
    }

    const checkUser = await User.findOne({
      username: req.body.username,
    });

    if (checkUser) {
      res.status(400);
      throw new Error('User already exists');
    }

    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    const user = await newUser.save();

    const tokenPayload: Jwtpayload = {
      id: user.id,
      username: user.username,
    };
    const tokens = createUserToken(tokenPayload);
    await updateRefreshToken(user.id, tokens.refreshToken);

    let resUser = user.toObject();
    delete user.password;
    delete user.refreshToken;
    formatResponse(res, { ...resUser, tokens });
  } catch (error: any) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      res.status(400);
      throw new Error(errors.username || errors.password);
    }

    let user = await User.findOne({
      username: req.body.username,
    });

    if (!user) {
      res.status(400);
      throw new Error('User not found');
    }

    if (!user.password) {
      res.status(400);
      throw new Error('User registered with social login');
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);

    if (!passwordMatch) {
      res.status(400);
      throw new Error('Password does not match');
    }

    const tokenPayload: Jwtpayload = {
      id: user.id,
      username: user.username,
    };
    const tokens = createUserToken(tokenPayload);
    await updateRefreshToken(user.id, tokens.refreshToken);

    user = user.toObject();
    delete user.password;
    delete user.refreshToken;
    formatResponse(res, { ...user, tokens });
  } catch (error: any) {
    next(error);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await updateRefreshToken(res.locals.user.id);

    formatResponse(res, {});
  } catch (error: any) {
    next(error);
  }
};

const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({
      _id: res.locals.user.id as string,
    });

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    const tokenPayload: Jwtpayload = {
      id: user.id,
      username: user.username,
    };
    const tokens = createUserToken(tokenPayload);
    await updateRefreshToken(user.id, tokens.refreshToken);

    formatResponse(res, { tokens });
  } catch (error: any) {
    next(error);
  }
};

export const updateRefreshToken = async (userId: string, refreshToken?: string) => {
  await User.updateOne({ _id: userId }, { refreshToken: refreshToken ?? null });
};

export const handlleAuthRoutes = () => {
  const router = Router();

  router.get('/users', users);
  router.post('/register', register);
  router.post('/login', login);
  router.post('/logout', jwtMiddleware, logout);
  router.get('/refresh', jwtMiddleware, refreshToken);

  return router;
};
