import {put, call, takeLatest} from 'redux-saga/effects';

import {fetch} from '../services/faqApi';

import {FAQ_REQUEST, FAQ_REQUEST_SUCCESS} from '../config/constants';

const fetchFaq = function* (action) {
  const request = yield call(fetch);

  if (request.response) {
    yield put({type: FAQ_REQUEST_SUCCESS, payload: request.response});
  }
};

const watchFaqSaga = function* () {
  return yield [takeLatest(FAQ_REQUEST, fetchFaq)];
};

export default watchFaqSaga;
