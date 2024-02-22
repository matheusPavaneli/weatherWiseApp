import { all } from 'redux-saga/effects';
import { watchFetchData } from '../features/weatherSaga';

export default function* rootSaga() {
  yield all([watchFetchData()]);
}
