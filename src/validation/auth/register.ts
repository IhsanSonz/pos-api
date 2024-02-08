import validator from '../validator';
const { isLength, isEmpty, isAlphanumeric, isMyEmpty } = validator;

interface RegisterDto {
  name: string;
  username: string;
  password: string;
}

export default function validateRegisterInput(data: RegisterDto) {
  let errors: any = {};

  data.name = !isMyEmpty(data.name) ? data.name : '';
  data.username = !isMyEmpty(data.username) ? data.username : '';
  data.password = !isMyEmpty(data.password) ? data.password : '';

  if (isEmpty(data.name)) {
    errors.name = '(name) Data Name dibutuhkan';
  }

  if (isEmpty(data.username)) {
    errors.username = '(username) Data Username dibutuhkan';
  }

  if (isEmpty(data.password)) {
    errors.password = '(password) Data Password dibutuhkan';
  }

  if (isMyEmpty(errors.name) && !isLength(data.name, { min: 3, max: 50 })) {
    errors.name = '(name) Nama Harus diantara 3 dan 50 Karakter';
  }

  if (isMyEmpty(errors.username) && !isAlphanumeric(data.username)) {
    errors.username = '(username) Username harus alphanumeric';
  }

  if (isMyEmpty(errors.password) && !isLength(data.password, { min: 6, max: 50 })) {
    errors.password = '(password) Password minimal 6 karakter';
  }

  return {
    errors,
    isValid: isMyEmpty(errors),
  };
}
