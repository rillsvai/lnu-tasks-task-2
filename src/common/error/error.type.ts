import { Response } from "express";

export type AppValidationError = Record<string, string>;

/* eslint-disable */
export type AppControllerFunction<TReq> = (req: TReq, res: Response) => any;
/* eslint-enable */
