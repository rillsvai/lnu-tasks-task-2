import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';
import { AppErrorMessage, ErrorStatusCode } from '../response/response.enum';
import { AppError } from '../error/error';
import { Language } from '../../app.type';
import { sendFailedAppResponse } from '../response/response.service';

/* eslint-disable */
export const applyValidationSchema =
  (schemas: {
    body?: (lang: Language) => z.ZodSchema<any>;
    query?: (lang: Language) => z.ZodSchema<any>;
    params?: (lang: Language) => z.ZodSchema<any>;
  }) =>
  (req: Request, res: Response, next: NextFunction) => {
    const lang: Language = (req.headers['lang'] as Language) || 'en';

    try {
      const validationErrors: Record<string, string> = {};
      const handleValidation = (schema: z.ZodSchema<any>, data: any) => {
        try {
          schema.parse(data);
        } catch (error) {
          if (error instanceof ZodError) {
            error.errors.forEach((err) => {
              const path = err.path.join('.');
              if (!validationErrors[path]) {
                validationErrors[path] = err.message;
              }
            });
          }
        }
      };
      if (schemas.body) {
        handleValidation(schemas.body(lang), req.body);
      }

      if (schemas.query) {
        handleValidation(schemas.query(lang), req.query);
      }

      if (schemas.params) {
        handleValidation(schemas.params(lang), req.params);
      }

      if (Object.keys(validationErrors).length > 0) {
        const appError = new AppError(AppErrorMessage.INVALID_REQUEST, ErrorStatusCode.BAD_REQUEST, [validationErrors]);
        return sendFailedAppResponse(res, appError);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
/* eslint-enable */
