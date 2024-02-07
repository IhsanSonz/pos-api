import validator from 'validator';
import isEmpty from '../is-empty.js';
const { isLength, isEmpty: _isEmpty, isAlphanumeric } = validator;

interface LoginDto {
  username: string;
  password: string;
}

export default function validateLoginInput(data: LoginDto) {
  let errors: any = {};

  data.username = !isEmpty(data.username) ? data.username : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (_isEmpty(data.username)) {
    errors.username = '(username) Data Username dibutuhkan';
  }

  if (_isEmpty(data.password)) {
    errors.password = '(password) Data Password dibutuhkan';
  }

  if (isEmpty(errors.username) && !isAlphanumeric(data.username)) {
    errors.username = '(username) Username harus alphanumeric';
  }

  if (isEmpty(errors.password) && !isLength(data.password, { min: 6, max: 50 })) {
    errors.password = '(password) Password minimal 6 karakter';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
