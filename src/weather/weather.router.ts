import { Router } from "express";
import { getCurrentWeatherSchema } from "./weather.validator";
import { getCurrentWeather } from "./weather.controller";
import { applyValidationSchema } from "src/common/validation/validation.middleware";
import { asyncErrorHandler } from "src/common/error/error.handler";

export const weatherRouter = Router();

weatherRouter.get(
  "/current",
  applyValidationSchema(getCurrentWeatherSchema),
  asyncErrorHandler(getCurrentWeather)
);
