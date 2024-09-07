import { AppValidationErrorMessageCollection } from './validation.interface';

export const appValidationErrorMessages: AppValidationErrorMessageCollection = {
  MUST_BE_VALID_NUMBER: {
    en: 'Must be a valid number',
    ar: 'يجب أن يكون رقمًا صالحًا',
  },
  MUST_BE_INTEGER: { en: 'Must be an integer', ar: 'يجب أن يكون عددًا صحيحًا' },
  MUST_BE_POSITIVE_INTEGER: {
    en: 'Must be a positive integer',
    ar: 'يجب أن يكون عددًا صحيحًا موجبًا',
  },
  MUST_BE_BETWEEN: (min: number, max: number) => ({
    en: `Must be between ${min} and ${max}`,
    ar: `يجب أن يكون بين ${min} و ${max}`,
  }),
  REQUIRED: { en: 'Required', ar: 'مطلوب' },
  NOT_FOUND: (recourseName: string) => ({
    en: `${recourseName} not found`,
    ar: `لم يتم العثور على ${recourseName}`,
  }),
  MUST_BE_COMMA_SEPARATED_POSITIVE_INTEGERS: {
    en: 'Must be comma-separated positive integers',
    ar: 'يجب أن تكون الأعداد الصحيحة الموجبة مفصولة بفاصلة',
  },
  MUST_BE_ENUM: (values) => {
    return {
      en: `Must be one of the following values: ${values.join(', ')}`,
      ar: `يجب أن يكون أحد القيم التالية: ${values.join(', ')}`,
    };
  },
};
