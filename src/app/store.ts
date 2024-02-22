import createSagaMiddleware from '@redux-saga/core';
import { WeatherSlice } from '../features/weatherSlice';
import { configureStore } from '@reduxjs/toolkit';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    weather: WeatherSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
