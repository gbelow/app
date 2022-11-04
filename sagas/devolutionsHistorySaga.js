import {put, call, takeLatest} from 'redux-saga/effects';

import {fetchHistory} from '../services/devolutionApi';

import {
  DEVOLUTIONS_HISTORY_REQUEST,
  DEVOLUTIONS_HISTORY_REQUEST_SUCCESS,
} from '../config/constants';

const _fetch = function* (action) {
  const request = yield call(fetchHistory);

  if (request.response) {
    yield put({
      type: DEVOLUTIONS_HISTORY_REQUEST_SUCCESS,
      payload: request.response,
    });
  }
};

const watchDevolutionsHistorySaga = function* () {
  return yield [takeLatest(DEVOLUTIONS_HISTORY_REQUEST, _fetch)];
};

export default watchDevolutionsHistorySaga;
