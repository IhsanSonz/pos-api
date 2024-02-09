import { Request } from 'express';
import { myValidator, MySchema } from '../../util/validator';

const schema: MySchema = {
  name: {
    notEmpty: {
      errorMessage: '(name) Data Name dibutuhkan',
    },
  },
  category: {
    notEmpty: {
      errorMessage: '(category) Data Category dibutuhkan',
    },
    isValidRef: {
      errorMessage: '(category) Data Category invalid',
    },
  },
};

export const storeValidation = async (req: Request) => await myValidator(req, schema);
