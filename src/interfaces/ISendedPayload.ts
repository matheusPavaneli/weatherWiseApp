import ICurrentWeatherData from './ICurrentWeatherData';
import IForecastWeatherData from './IForecastWeatherData';
import IImageData from './IImageData';
import ITimezone from './ITimezone';
import IUV from './IUv';

export default interface ISendedPayload {
  currentWeather: ICurrentWeatherData | null;
  forecastWeather: IForecastWeatherData[] | null;
  timezone: ITimezone | null;
  uv: IUV | null;
  cityImage: IImageData | null;
}
