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
};

export const storeValidation = async (req: Request) => await myValidator(req, schema);
