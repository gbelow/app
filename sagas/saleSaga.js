import {Alert} from 'react-native';

import {put, call, takeLatest} from 'redux-saga/effects';

import {fetch, sincronize} from '../services/saleApi';

import {fetchMe} from '../services/meApi';

import {
  BACK,
  ALERT_SUCCESS,
  SALE_SINCRONIZE_REQUEST,
  SALE_SINCRONIZE_REQUEST_SUCCESS,
  SALE_LOCAL_CREATE_REQUEST,
  SALE_LOCAL_CREATE_REQUEST_SUCCESS,
  SALE_LOCAL_DELETE_REQUEST,
  SALE_LOCAL_DELETE_REQUEST_SUCCESS,
  SALES_HISTORY_REQUEST,
  SALES_HISTORY_REQUEST_SUCCESS,
  SALES_INCREMENT_LAST_SALE_ID,
  ME_REQUEST,
  MENUS_REQUEST,
} from '../config/constants';

import {store} from '../app';

const createSale = function* (action) {
  const sale = action.payload;

  sale.saleId = yield call(_generateId);

  yield put({type: SALE_LOCAL_CREATE_REQUEST_SUCCESS, payload: sale});
  yield put({type: SALES_INCREMENT_LAST_SALE_ID});
  yield put({type: BACK, payload: {forceBack: true}});
};

const destroySale = function* (action) {
  yield put({type: SALE_LOCAL_DELETE_REQUEST_SUCCESS, payload: action.payload});
};

const sincronizeSales = function* () {
  const meRequest = yield call(fetchMe);

  if (meRequest.response) {
    if (meRequest.response.data && meRequest.response.data.actionMember) {
      const historyRequest = yield call(fetch);

      if (historyRequest.response) {
        yield put({
          type: SALES_HISTORY_REQUEST_SUCCESS,
          payload: historyRequest.response,
        });

        const sincronizeRequest = yield call(sincronize);

        if (sincronizeRequest.response) {
          yield put({
            type: SALE_SINCRONIZE_REQUEST_SUCCESS,
            payload: sincronizeRequest.response,
          });
        }
      }
    } else {
      Alert.alert(
        'Atenção',
        'Só é possível enviar vendas se você estiver inscrito em alguma ação de marketing.\n\n' +
          'Quando houver alguma ação ativa ela estará disponível no menu do app.',
        [{text: 'OK'}],
        {cancelable: false},
      );
    }
  }
};

export function _generateId() {
  const {history} = store.getState();

  if (!history.meta.lastSaleId) {
    history.meta.lastSaleId = 0;
  }

  return history.meta.lastSaleId + 1;
}

const watchSaleSaga = function* () {
  return yield [
    takeLatest(SALE_LOCAL_CREATE_REQUEST, createSale),
    takeLatest(SALE_LOCAL_DELETE_REQUEST, destroySale),
    takeLatest(SALE_SINCRONIZE_REQUEST, sincronizeSales),
  ];
};

export default watchSaleSaga;
