import { Request } from 'express';
import { myValidator, MySchema } from '../../util/validator';

const schema: MySchema = {
  username: {
    notEmpty: {
      errorMessage: '(username) Data Username dibutuhkan',
    },
  },
  password: {
    notEmpty: {
      errorMessage: '(password) Data Password dibutuhkan',
    },
  },
};

export const loginValidation = async (req: Request) => await myValidator(req, schema);
