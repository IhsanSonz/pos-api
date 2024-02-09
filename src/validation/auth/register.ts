import { Request } from 'express';
import { myValidator, MySchema } from '../../util/validator';

export const schema: MySchema = {
  name: {
    notEmpty: {
      errorMessage: '(name) Data Name dibutuhkan',
    },
    isLength: {
      options: { min: 3, max: 50 },
      errorMessage: '(name) Nama Harus diantara 3 dan 50 Karakter',
    },
  },
  username: {
    notEmpty: {
      errorMessage: '(username) Data Username dibutuhkan',
    },
    isAlphanumeric: {
      errorMessage: '(username) Username harus alphanumeric',
    },
  },
  password: {
    notEmpty: {
      errorMessage: '(password) Data Password dibutuhkan',
    },
    isLength: {
      options: { min: 6, max: 50 },
      errorMessage: '(password) Password Harus diantara 3 dan 50 Karakter',
    },
    isValidRef: true,
  },
};

export const registerValidation = async (req: Request) => await myValidator(req, schema);
