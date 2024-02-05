import validator, { isAlphanumeric } from 'validator';
import isEmpty from '../is-empty.js';
const { isLength, isEmpty: _isEmpty } = validator;

interface RegisterDto {
  name: string;
  username: string;
  password: string;
}

export default function validateRegisterInput(data: RegisterDto) {
  let errors: RegisterDto = {
    name: '',
    username: '',
    password: '',
  };

  data.name = !isEmpty(data.name) ? data.name : '';
  data.username = !isEmpty(data.username) ? data.username : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (_isEmpty(data.name as string)) {
    errors.name = 'Data nama dibutuhkan';
  }

  if (_isEmpty(data.username as string)) {
    errors.username = 'Data Username dibutuhkan';
  }

  if (_isEmpty(data.password as string)) {
    errors.password = 'Data Password dibutuhkan';
  }

  if (!isLength(data.name as string, { min: 3, max: 50 })) {
    errors.name = 'Nama Harus diantara 3 dan 50 Karakter';
  }

  if (!isAlphanumeric(data.username as string)) {
    errors.username = 'Username tidak valid';
  }

  if (!isLength(data.username as string, { min: 3, max: 50 })) {
    errors.name = 'Nama Harus diantara 3 dan 50 Karakter';
  }

  if (!isLength(data.password as string, { min: 6, max: 50 })) {
    errors.password = 'Password minimal 6 karakter';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
