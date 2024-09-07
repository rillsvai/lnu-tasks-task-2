import { appLogger } from "src/common/logger/logger.config";

export const getWeatherData = async (lon: string, lat: string) => {
  appLogger.info(`fetching weather data for lat: ${lat} and lon: ${lon}`);

  const response = imaginaryAxiosCall();

  const currentWeather = response.data.currentWeather;

  return {
    currentWeather,
  };
};

function imaginaryAxiosCall() {
  return {
    data: {
      currentWeather: {
        temperature: 23,
        temperatureMax: 24.2,
        temperatureMin: 20.3,
      },
    },
  };
}
