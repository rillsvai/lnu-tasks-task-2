export interface AppValidationErrorMessage {
  en: string;
  ar: string;
}

export interface AppValidationErrorMessageCollection {
  MUST_BE_VALID_NUMBER: AppValidationErrorMessage;
  MUST_BE_INTEGER: AppValidationErrorMessage;
  MUST_BE_POSITIVE_INTEGER: AppValidationErrorMessage;
  MUST_BE_BETWEEN: (min: number, max: number) => AppValidationErrorMessage;
  REQUIRED: AppValidationErrorMessage;
  NOT_FOUND: (resourceName: string) => AppValidationErrorMessage;
  MUST_BE_COMMA_SEPARATED_POSITIVE_INTEGERS: AppValidationErrorMessage;
  MUST_BE_ENUM: (values: string[]) => AppValidationErrorMessage;
}
