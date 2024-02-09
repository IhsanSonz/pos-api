import { Response } from 'express';
import { ResponseType, ResponseTypeDefault } from '../types/response';

// Define isEmpty function
const isEmpty = (value: any) => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};

export const formatResponse = <T>(res: Response, data?: T, message?: string, success?: boolean): void => {
  let response = ResponseTypeDefault as ResponseType<T>;

  if (res.statusCode === 200 && !message) message = 'OK';

  if (data) {
    response = {
      message: message ?? response.message,
      success: success ?? response.success,
      data: !isEmpty(data) ? data : null,
    } as ResponseType<T>;
  }

  res.json(response);
};
