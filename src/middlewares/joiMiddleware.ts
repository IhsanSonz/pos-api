import { Request, Response, NextFunction } from 'express';
import * as Validators from '../validation';
import _ from 'lodash';
import { ObjectSchema } from 'joi';

const joiMiddleware = (validator: string, location: string = 'body') => {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      if (!_.get(Validators, validator)) throw new Error(`'${validator}' validator is not exist`);
      let schema: ObjectSchema = _.get(Validators, validator);
      if (location === 'body') await schema.validateAsync(req.body);
      if (location === 'params') await schema.validateAsync(req.params);
      if (location === 'query') await schema.validateAsync(req.query);
      next();
    } catch (error: any) {
      next(error);
    }
  };
};

export default joiMiddleware;
