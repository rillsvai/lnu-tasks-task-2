import { Response } from 'express';
import { AppError } from './error';
import { appLogger } from '../logger/logger.config';
import { AppErrorMessage, ErrorStatusCode } from '../response/response.enum';
import { sendFailedAppResponse } from '../response/response.service';

/* eslint-disable */
export function asyncErrorHandler(fn: any) {
  return (req: any, res: Response) => {
    fn(req, res).catch((error: unknown) => {
      if (error instanceof AppError) {
        sendFailedAppResponse(res, error);
      } else {
        appLogger.error(`unhandled error occured`);
        appLogger.error(error);

        const appError = new AppError(AppErrorMessage.INTERNAL_SERVER_ERROR, ErrorStatusCode.INTERNAL_SERVER_ERROR);
        sendFailedAppResponse(res, appError);
      }
    });
  };
}
