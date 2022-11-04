import {put, call, takeLatest} from 'redux-saga/effects';

import {fetchVersion, sendVersion} from '../services/versionApi';

import {
  VERSION_REQUEST,
  VERSION_REQUEST_SUCCESS,
  VERSION_SEND_REQUEST,
  VERSION_SEND_REQUEST_SUCCESS,
} from '../config/constants';

const fetch = function* () {
  const request = yield call(fetchVersion);

  if (request.response) {
    yield put({type: VERSION_REQUEST_SUCCESS, payload: request.response});
  }
};

const send = function* () {
  const request = yield call(sendVersion);

  if (request.response) {
    yield put({type: VERSION_SEND_REQUEST_SUCCESS, payload: request.response});
  }
};

const watchVersionSaga = function* () {
  return yield [
    takeLatest(VERSION_REQUEST, fetch),
    takeLatest(VERSION_SEND_REQUEST, send),
  ];
};

export default watchVersionSaga;
