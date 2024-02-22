import ICurrentWeatherData from './ICurrentWeatherData';
import IForecastWeatherData from './IForecastWeatherData';
import IImageData from './IImageData';
import ITimezone from './ITimezone';
import IUV from './IUv';

export default interface IWeatherState {
  currentWeatherData: ICurrentWeatherData | null;
  forecastWeatherData: IForecastWeatherData[] | null;
  timezone: ITimezone | null;
  uv: IUV | null;
  cityImage: IImageData | null;
  isLoading: boolean;
  error: string | string[];
}
