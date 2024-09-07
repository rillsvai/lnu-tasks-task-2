import { z } from "zod";
import { appValidationErrorMessages } from "../common/validation/validation.constants";
import { stringNumberSchema } from "../common/validation/validation.schema";
import { Language } from "../app.type";

export const getCurrentWeatherSchema = {
  query: (lang: Language) =>
    z.object({
      lat: stringNumberSchema(lang).refine(
        (val: number) => val >= -90 && val <= 90,
        {
          message: appValidationErrorMessages.MUST_BE_BETWEEN(-90, 90)[lang],
        }
      ),
      lon: stringNumberSchema(lang).refine(
        (val: number) => val >= -180 && val <= 180,
        {
          message: appValidationErrorMessages.MUST_BE_BETWEEN(-180, 180)[lang],
        }
      ),
    }),
};
