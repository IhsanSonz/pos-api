import validator from '../validator';
const { isEmpty, isMyEmpty } = validator;

interface LoginDto {
  username: string;
  password: string;
}

export default function validateLoginInput(data: LoginDto) {
  let errors: any = {};

  data.username = !isMyEmpty(data.username) ? data.username : '';
  data.password = !isMyEmpty(data.password) ? data.password : '';

  if (isEmpty(data.username)) {
    errors.username = '(username) Data Username dibutuhkan';
  }

  if (isEmpty(data.password)) {
    errors.password = '(password) Data Password dibutuhkan';
  }

  return {
    errors,
    isValid: isMyEmpty(errors),
  };
}
