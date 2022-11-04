import {put, call, takeLatest} from 'redux-saga/effects';

import fetch from '../services/contentApi';
import {CONTENT_REQUEST, CONTENT_REQUEST_SUCCESS} from '../config/constants';

const fetchContent = function* (action) {
  const request = yield call(fetch, action.payload);

  if (request.response) {
    yield put({
      type: CONTENT_REQUEST_SUCCESS,
      payload: {items: request.response, category: action.payload},
    });
  }
};

const watchContentSaga = function* () {
  return yield [takeLatest(CONTENT_REQUEST, fetchContent)];
};

export default watchContentSaga;
