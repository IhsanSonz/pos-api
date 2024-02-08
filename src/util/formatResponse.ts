import { Response } from 'express';
import { ResponseType, ResponseTypeDefault } from '../types/response';
import validator from '../validation/validator';
export const formatResponse = <T>(res: Response, data?: T, message?: string, success?: boolean): void => {
  let response = ResponseTypeDefault as ResponseType<T>;

  if (res.statusCode === 200 && !message) message = 'OK';

  if (data) {
    response = {
      message: message ?? response.message,
      success: success ?? response.success,
      data: !validator.isEmpty(data) ? data : null,
    } as ResponseType<T>;
  }

  res.json(response);
};
