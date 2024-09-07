import { z } from 'zod';
import { appValidationErrorMessages } from './validation.constants';
import { Language } from '../../app.type';

export const stringPositiveIntegerSchema = (lang: Language) => {
  return z.coerce
    .number({ message: appValidationErrorMessages.MUST_BE_VALID_NUMBER[lang] })
    .int({ message: appValidationErrorMessages.MUST_BE_INTEGER[lang] })
    .positive({
      message: appValidationErrorMessages.MUST_BE_POSITIVE_INTEGER[lang],
    });
};

/* eslint-disable */
export const stringNumberSchema = (lang: Language) => {
  return z
    .string({ message: appValidationErrorMessages.REQUIRED[lang] })
    .refine((value) => !isNaN(value as any) && !isNaN(parseFloat(value)), {
      message: appValidationErrorMessages.MUST_BE_VALID_NUMBER[lang],
    })
    .transform((value) => Number(value));
};
/* eslint-enable */

/* eslint-disable */
export const commaSeparatedPositiveIntegersSchema = (lang: Language) => {
  return z.string({ message: appValidationErrorMessages.REQUIRED[lang] }).refine(
    (value: string) => {
      const ids = value.split(',');
      return ids.every(
        (id) => !isNaN(id as any) && !isNaN(parseFloat(id)) && Number.isInteger(parseFloat(id)) && parseInt(id) > 0
      );
    },
    {
      message: appValidationErrorMessages.MUST_BE_COMMA_SEPARATED_POSITIVE_INTEGERS[lang],
    }
  );
};
/* eslint-enable */
