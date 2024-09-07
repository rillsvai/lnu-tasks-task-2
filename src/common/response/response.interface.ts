import { AppErrorMessage } from "./response.enum";

/* eslint-disable */
export interface AppErrorReponse {
  message: AppErrorMessage;
  validationErrors: any;
}
