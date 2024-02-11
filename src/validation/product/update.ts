import { Request } from 'express';
import { myValidator, MySchema } from '../../util/validator';

const schema: MySchema = {
  id: {
    isValidRef: {
      errorMessage: '(id) Data ID invalid',
    },
  },
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

export const updateValidation = async (req: Request) => await myValidator(req, schema);
