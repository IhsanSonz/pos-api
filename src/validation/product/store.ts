import validator from '../validator';
const { isEmpty, isValidRef } = validator;

interface StoreDto {
  name: string;
  category: string;
}

export default function validateStoreInput(data: StoreDto) {
  let errors: any = {};

  if (isEmpty(data.name)) {
    errors.name = '(name) Data Name dibutuhkan';
  }

  if (isEmpty(data.category)) {
    errors.category = '(category) Data Category dibutuhkan';
  }

  if (!isValidRef(data.category)) {
    errors.category = '(category) Data Category tidak valid';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}
