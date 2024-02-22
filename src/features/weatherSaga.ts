/* eslint-disable @typescript-eslint/no-explicit-any */
import { put, call, all, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  weatherDataFailure,
  weatherDataSuccess,
  weatherDataRequest,
} from './weatherSlice';
import {
  getCurrentWeather,
  getForecastWeather,
  getImage,
  getTimezone,
  getUVIndex,
} from '../api/weatherApi';
import IReceivedPayload from '../interfaces/IReceivedPayload';
import ICurrentWeatherData from '../interfaces/ICurrentWeatherData';
import IForecastWeatherData from '../interfaces/IForecastWeatherData';
import ITimezone from '../interfaces/ITimezone';
import IUV from '../interfaces/IUv';
import ISendedPayload from '../interfaces/ISendedPayload';
import IImageData from '../interfaces/IImageData';

function* fetchDataSaga(
  action: PayloadAction<IReceivedPayload>,
): Generator<
  any,
  any,
  [ICurrentWeatherData, IForecastWeatherData[], ITimezone, IUV, IImageData]
> {
  try {
    const payload = {
      cityName: action.payload.cityName,
      language: action.payload.language ?? 'en',
      units: action.payload.unitsSystem ?? 'metric',
    };

    const [currentWeather, forecastWeather, timezone, uvIndex, cityImage]: [
      ICurrentWeatherData,
      IForecastWeatherData[],
      ITimezone,
      IUV,
      IImageData,
    ] = yield all([
      call(getCurrentWeather, payload),
      call(getForecastWeather, payload),
      call(getTimezone, { cityName: payload.cityName }),
      call(getUVIndex, { cityName: payload.cityName }),
      call(getImage, { cityName: payload.cityName }),
    ]);

    const data: ISendedPayload = {
      currentWeather,
      forecastWeather,
      timezone,
      uv: uvIndex,
      cityImage,
    };

    yield put(weatherDataSuccess(data));
  } catch (error) {
    yield put(weatherDataFailure());
  }
}

export function* watchFetchData() {
  yield takeEvery(weatherDataRequest.type, fetchDataSaga);
}
