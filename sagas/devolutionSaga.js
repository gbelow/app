import {put, call, takeLatest} from 'redux-saga/effects';

import {sincronize, fetchHistory} from '../services/devolutionApi';

import {
  BACK,
  ALERT_SUCCESS,
  DEVOLUTIONS_HISTORY_REQUEST_SUCCESS,
  DEVOLUTION_SINCRONIZE_REQUEST,
  DEVOLUTION_SINCRONIZE_REQUEST_SUCCESS,
} from '../config/constants';

const sincronizeDevolution = function* (action) {
  const historyRequest = yield call(fetchHistory);

  if (historyRequest.response) {
    yield put({
      type: DEVOLUTIONS_HISTORY_REQUEST_SUCCESS,
      payload: historyRequest.response,
    });

    const sincronizeRequest = yield call(sincronize, action.payload);

    if (sincronizeRequest.response) {
      yield put({type: DEVOLUTION_SINCRONIZE_REQUEST_SUCCESS});
      yield put({
        type: ALERT_SUCCESS,
        payload: {description: 'Devolução realizada com sucesso'},
      });
      yield put({type: BACK});
    }
  }
};

const watchDevolutionSaga = function* () {
  return yield [
    takeLatest(DEVOLUTION_SINCRONIZE_REQUEST, sincronizeDevolution),
  ];
};

export default watchDevolutionSaga;
