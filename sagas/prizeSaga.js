import {put, call, takeLatest} from 'redux-saga/effects';

import {fetch, confirm} from '../services/prizeApi';

import {store} from '../app';

import {
  ME_REQUEST,
  PRIZES_REQUEST,
  PRIZES_REQUEST_SUCCESS,
  PRIZE_CONFIRM_REQUEST,
  PRIZE_CONFIRM_REQUEST_SUCCESS,
  PRIZES_RESET_REQUEST,
  PRIZES_RESET_REQUEST_SUCCESS,
} from '../config/constants';

const fetchPrizes = function* (action) {
  const request = yield call(fetch, action.payload);

  if (request.response) {
    yield put({type: PRIZES_REQUEST_SUCCESS, payload: request.response});
  }
};

const resetPrizes = function* () {
  yield put({type: PRIZES_RESET_REQUEST_SUCCESS});
};

const confirmPrize = function* (params) {
  const {session, action} = store.getState();

  const request = yield call(confirm, {
    user: session.data.user,
    action: action.data,
    data: params.payload,
  });

  if (request.response) {
    yield put({type: PRIZE_CONFIRM_REQUEST_SUCCESS, payload: request.response});
    yield put({
      type: PRIZES_REQUEST,
      payload: {user: session.data.user, action: action.data},
    });
    yield put({type: ME_REQUEST});
  }
};

const watchPrizeSaga = function* () {
  return yield [
    takeLatest(PRIZES_REQUEST, fetchPrizes),
    takeLatest(PRIZE_CONFIRM_REQUEST, confirmPrize),
    takeLatest(PRIZES_RESET_REQUEST, resetPrizes),
  ];
};

export default watchPrizeSaga;
