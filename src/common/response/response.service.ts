import { Response } from 'express';
import { AppError } from '../error/error';
import { AppValidationError } from '../error/error.type';
import { SuccessStatusCode } from './response.enum';
import { AppErrorReponse } from './response.interface';

function mergeValidationErrors(validationErrors: AppValidationError[]): AppValidationError {
  return validationErrors.reduce((acc, currentError) => {
    return { ...acc, ...currentError };
  }, {});
}

export function sendSuccessfulAppResponse<T>(
  res: Response,
  data: T,
  statusCode: SuccessStatusCode = SuccessStatusCode.OK
) {
  res.status(statusCode).json({ data });
}

export function sendFailedAppResponse(res: Response, error: AppError) {
  const payload: AppErrorReponse = {
    message: error.message,
    validationErrors: {},
  };

  if (error.validationErrors && error.validationErrors.length !== 0) {
    payload.validationErrors = mergeValidationErrors(error.validationErrors);
  }

  res.status(error.statusCode).json(payload);
}
