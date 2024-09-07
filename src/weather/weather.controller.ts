import { Response, Request } from "express";
import { sendSuccessfulAppResponse } from "../common/response/response.service";
import { getWeatherData } from "./weather.service";

export const getCurrentWeather = async (req: Request, res: Response) => {
  const { lat, lon } = req.query;

  const weatherData = await getWeatherData(lon as string, lat as string);

  const { currentWeather } = weatherData;

  const payload = {
    temp: {
      current: currentWeather.temperature,
      max: currentWeather?.temperatureMax || currentWeather.temperature,
      min: currentWeather?.temperatureMin || currentWeather.temperature,
    },
  };

  sendSuccessfulAppResponse(res, payload);
};
