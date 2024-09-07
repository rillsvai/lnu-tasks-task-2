import { Router } from "express";
import { weatherRouter } from "./weather/weather.router";

export const appRouter = Router();

appRouter.use("/weather", weatherRouter);
