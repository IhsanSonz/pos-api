import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';
import { CustomSchema, ExpressValidator, validationResult } from 'express-validator';

const myExpressValidator = new ExpressValidator({
  isValidRef: (value: string) => {
    try {
      const valid = mongoose.Types.ObjectId.isValid(value);
      return valid;
    } catch (error: any) {
      return false;
    }
  },
});

export type MySchema = CustomSchema<typeof myExpressValidator>;

export const myValidator = async (req: Request, schema: MySchema) => {
  await myExpressValidator.checkSchema(schema).run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new Error(errors.array()[0].msg);
  }
};
