import {put, call, takeLatest} from 'redux-saga/effects';

import {store} from '../app';

import {fetchTerms, fetchUserTerms, accept} from '../services/termsApi';

import {
  TERMS_REQUEST,
  TERMS_REQUEST_SUCCESS,
  USER_TERMS_REQUEST,
  USER_TERMS_REQUEST_SUCCESS,
  TERMS_ACCEPT_REQUEST,
  TERMS_ACCEPT_REQUEST_SUCCESS,
  NAVIGATE,
} from '../config/constants';

const _fetchTerms = function* () {
  const request = yield call(fetchTerms);

  if (request.response) {
    yield put({type: TERMS_REQUEST_SUCCESS, payload: request.response});
  }
};

const _fetchUserTerms = function* () {
  const request = yield call(fetchUserTerms);

  if (request.response) {
    yield put({type: TERMS_REQUEST_SUCCESS, payload: request.response});
  }
};

const _acceptTerms = function* () {
  const request = yield call(accept);

  if (request.response) {
    yield put({type: TERMS_ACCEPT_REQUEST_SUCCESS, payload: request.response});
    yield put({type: NAVIGATE, routeName: 'AppNav'});
  }
};

const watchTermsSaga = function* () {
  return yield [
    takeLatest(TERMS_REQUEST, _fetchTerms),
    takeLatest(USER_TERMS_REQUEST, _fetchUserTerms),
    takeLatest(TERMS_ACCEPT_REQUEST, _acceptTerms),
  ];
};

export default watchTermsSaga;
