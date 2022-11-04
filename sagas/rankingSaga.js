import {put, call, takeLatest} from 'redux-saga/effects';

import fetch from '../services/rankingApi';
import {
  RANKING_REQUEST,
  RANKING_REQUEST_SUCCESS,
  RANKING_RESET_REQUEST,
  RANKING_RESET_REQUEST_SUCCESS,
} from '../config/constants';

const fetchRanking = function* (action) {
  const request = yield call(fetch, action.payload);

  if (request.response) {
    yield put({type: RANKING_REQUEST_SUCCESS, payload: request.response});
  }
};

const resetRanking = function* () {
  yield put({type: RANKING_RESET_REQUEST_SUCCESS});
};

const watchRankingSaga = function* () {
  return yield [
    takeLatest(RANKING_REQUEST, fetchRanking),
    takeLatest(RANKING_RESET_REQUEST, resetRanking),
  ];
};

export default watchRankingSaga;
