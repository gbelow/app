import {put, call, takeLatest} from 'redux-saga/effects';

import {fetch, create, update} from '../services/customerApi';

import {
  BACK,
  ALERT_SUCCESS,
  CUSTOMERS_REQUEST,
  CUSTOMERS_REQUEST_SUCCESS,
  CUSTOMER_CREATE_REQUEST,
  CUSTOMER_CREATE_REQUEST_SUCCESS,
  CUSTOMER_SALE_REQUEST,
  CUSTOMER_SALE_REQUEST_SUCCESS,
  CUSTOMER_SALE_RESET_REQUEST,
  CUSTOMER_SALE_RESET_REQUEST_SUCCESS,
  CUSTOMER_UPDATE_REQUEST,
  CUSTOMER_UPDATE_REQUEST_SUCCESS,
} from '../config/constants';

const fetchCustomers = function* (action) {
  const request = yield call(fetch);

  if (request.response) {
    let customers = request.response;

    yield call(() => {
      customers.data.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
    });

    yield put({type: CUSTOMERS_REQUEST_SUCCESS, payload: customers});
  }
};

const createCustomer = function* (action) {
  const request = yield call(create, action.payload);

  if (request.response) {
    yield put({
      type: CUSTOMER_CREATE_REQUEST_SUCCESS,
      payload: request.response,
    });
    yield put({type: CUSTOMERS_REQUEST, payload: action.payload.user});
    yield put({
      type: ALERT_SUCCESS,
      payload: {description: 'Cliente adicionado.'},
    });
    yield put({type: BACK});
  }
};

const createCustomerSale = function* (action) {
  const request = yield call(create, action.payload);

  if (request.response) {
    yield put({type: CUSTOMER_SALE_REQUEST_SUCCESS, payload: request.response});
    yield put({type: CUSTOMERS_REQUEST, payload: action.payload.user});
    yield put({type: BACK});
  }
};

const updateCustomer = function* (action) {
  const request = yield call(update, action.payload);

  if (request.response) {
    yield put({
      type: CUSTOMER_UPDATE_REQUEST_SUCCESS,
      payload: request.response,
    });
    yield put({type: CUSTOMERS_REQUEST, payload: action.payload.user});
    yield put({
      type: ALERT_SUCCESS,
      payload: {description: 'Cliente editado com sucesso.'},
    });
    yield put({type: BACK});
  }
};

const resetCustomerSale = function* () {
  yield put({type: CUSTOMER_SALE_RESET_REQUEST_SUCCESS});
};

const watchCustomerSaga = function* () {
  return yield [
    takeLatest(CUSTOMERS_REQUEST, fetchCustomers),
    takeLatest(CUSTOMER_CREATE_REQUEST, createCustomer),
    takeLatest(CUSTOMER_SALE_REQUEST, createCustomerSale),
    takeLatest(CUSTOMER_SALE_RESET_REQUEST, resetCustomerSale),
    takeLatest(CUSTOMER_UPDATE_REQUEST, updateCustomer),
  ];
};

export default watchCustomerSaga;
