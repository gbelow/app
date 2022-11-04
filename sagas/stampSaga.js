import {put, call, takeLatest} from 'redux-saga/effects';

import {fetch} from '../services/stampApi';

import {STAMPS_REQUEST, STAMPS_REQUEST_SUCCESS} from '../config/constants';

const fetchStamps = function* () {
  const request = yield call(fetch);

  if (request.response) {
    yield put({type: STAMPS_REQUEST_SUCCESS, payload: request.response});
  }
};

const watchStampSaga = function* () {
  return yield [takeLatest(STAMPS_REQUEST, fetchStamps)];
};

export default watchStampSaga;
