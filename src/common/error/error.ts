import { AppErrorMessage, ErrorStatusCode } from "../response/response.enum";
import { AppValidationError } from "./error.type";

export class AppError extends Error {
  constructor(
    public readonly message: AppErrorMessage,
    public readonly statusCode: ErrorStatusCode,
    public readonly validationErrors?: AppValidationError[]
  ) {
    super(message);
    this.statusCode = statusCode;
    this.validationErrors = validationErrors;
  }
}
