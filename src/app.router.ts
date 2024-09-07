import { Router } from "express";

export const appRouter = Router();

appRouter.use("/weather", weatherRouter);
