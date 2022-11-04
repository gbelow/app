import {put, call, takeLatest} from 'redux-saga/effects';

import {store} from '../app';

import {
  fetch,
  fetchTerms,
  fetchHistory,
  subscribe,
} from '../services/actionApi';

import {
  ACTION_REQUEST,
  ACTION_REQUEST_SUCCESS,
  ACTIONS_HISTORY_REQUEST,
  ACTIONS_HISTORY_REQUEST_SUCCESS,
  ACTION_SUBSCRIBE_REQUEST,
  ACTION_SUBSCRIBE_REQUEST_SUCCESS,
  ACTION_TERMS_REQUEST,
  ACTION_TERMS_REQUEST_SUCCESS,
  ME_REQUEST_SUCCESS,
} from '../config/constants';

const fetchAction = function* (action) {
  const request = yield call(fetch, action.payload);

  if (request.response) {
    yield put({type: ACTION_REQUEST_SUCCESS, payload: request.response});
  }
};

const fetchActionTerms = function* (action) {
  const request = yield call(fetchTerms, action.payload);

  if (request.response) {
    yield put({type: ACTION_TERMS_REQUEST_SUCCESS, payload: request.response});
  }
};

const userSubscribeAction = function* () {
  const request = yield call(subscribe);

  if (request.response) {
    const {action, session} = store.getState();

    session.data.actionMember = true;

    yield put({
      type: ACTION_SUBSCRIBE_REQUEST_SUCCESS,
      payload: request.response,
    });
    yield put({type: ACTION_REQUEST, payload: action.data});
    yield put({type: ME_REQUEST_SUCCESS, payload: session});
  }
};

const fetchActionsHistory = function* () {
  const request = yield call(fetchHistory);

  if (request.response) {
    yield put({
      type: ACTIONS_HISTORY_REQUEST_SUCCESS,
      payload: request.response,
    });
  }
};

const watchActionSaga = function* () {
  return yield [
    takeLatest(ACTION_REQUEST, fetchAction),
    takeLatest(ACTIONS_HISTORY_REQUEST, fetchActionsHistory),
    takeLatest(ACTION_TERMS_REQUEST, fetchActionTerms),
    takeLatest(ACTION_SUBSCRIBE_REQUEST, userSubscribeAction),
  ];
};

export default watchActionSaga;
