import { Response } from 'express';
import { ResponseType, ResponseTypeDefault } from '../types/response';

export const formatResponse = <T>(res: Response, data?: T, message?: string, success?: boolean): void => {
  let response = ResponseTypeDefault as ResponseType<T>;

  if (data) {
    response = {
      message: message ?? response.message,
      success: success ?? response.success,
      data,
    } as ResponseType<T>;
  }

  res.json(response);
};
