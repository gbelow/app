import {put, call, takeLatest} from 'redux-saga/effects';

import {fetch} from '../services/saleApi';

import {
  SALES_HISTORY_REQUEST,
  SALES_HISTORY_REQUEST_SUCCESS,
  SALES_INCREMENT_LAST_SALE_ID,
  SALES_INCREMENT_LAST_SALE_ID_SUCCESS,
} from '../config/constants';

import {store} from '../app';

const fetchHistory = function* (action) {
  const request = yield call(fetch, action.payload);

  if (request.response) {
    yield put({type: SALES_HISTORY_REQUEST_SUCCESS, payload: request.response});
  }
};

const incrementSaleId = function* () {
  const {history} = store.getState();

  history.meta.lastSaleId += 1;

  yield put({type: SALES_INCREMENT_LAST_SALE_ID_SUCCESS, payload: history});
};

const watchSalesHistorySaga = function* () {
  return yield [
    takeLatest(SALES_HISTORY_REQUEST, fetchHistory),
    takeLatest(SALES_INCREMENT_LAST_SALE_ID, incrementSaleId),
  ];
};

export default watchSalesHistorySaga;
