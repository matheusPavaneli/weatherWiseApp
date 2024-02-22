/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IWeatherState from '../interfaces/IWeatherState';
import ISendedPayload from '../interfaces/ISendedPayload';
import IReceivedPayload from '../interfaces/IReceivedPayload';

const initialState: IWeatherState = {
  currentWeatherData: null,
  forecastWeatherData: null,
  timezone: null,
  uv: null,
  cityImage: null,
  isLoading: false,
  error: [],
};

export const WeatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    weatherDataRequest: (state, _action: PayloadAction<IReceivedPayload>) => {
      state.isLoading = true;
    },
    weatherDataFailure: (state) => {
      state.isLoading = false;
    },
    weatherDataSuccess: (state, action: PayloadAction<ISendedPayload>) => {
      state.isLoading = false;
      state.currentWeatherData = action.payload.currentWeather;
      state.forecastWeatherData = action.payload.forecastWeather;
      state.timezone = action.payload.timezone;
      state.uv = action.payload.uv;
      state.cityImage = action.payload.cityImage;
    },
  },
});

export default WeatherSlice.reducer;
export const { weatherDataRequest, weatherDataFailure, weatherDataSuccess } =
  WeatherSlice.actions;
