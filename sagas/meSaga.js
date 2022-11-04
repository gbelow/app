import {put, call, takeLatest} from 'redux-saga/effects';

import {
  fetchMe,
  update,
  deleteMe as removeMe,
  resetPassword,
  requestResetPassword,
} from '../services/meApi';

import {store} from '../app';

import {
  ME_REQUEST,
  ME_REQUEST_SUCCESS,
  ME_UPDATE_REQUEST,
  ME_UPDATE_REQUEST_SUCCESS,
  ME_DELETE_REQUEST,
  ALERT_SUCCESS,
  MENUS_REQUEST,
  SALES_HISTORY_REQUEST,
  REFRESH_REQUEST_SUCCESS,
  RESET_NAVIGATION,
  LOGOUT_REQUEST,
  RESET_MENUS_REQUEST,
  CUSTOMERS_REQUEST,
  NAVIGATE,
  ME_RESET_PASSWORD,
  ME_REQUEST_PASSWORD,
} from '../config/constants';

const fetch = function* (action) {
  const {history, customers} = store.getState();

  const request = yield call(fetchMe, action.payload);

  if (request.response) {
    yield put({type: ME_REQUEST_SUCCESS, payload: request.response});
    yield put({type: MENUS_REQUEST});

    if (!history.data) {
      yield put({type: SALES_HISTORY_REQUEST});
    }

    if (!customers.data) {
      yield put({type: CUSTOMERS_REQUEST});
    }

    yield put({type: REFRESH_REQUEST_SUCCESS});

    if (request.response.data.mustAcceptUseTerm) {
      const actions = [{type: NAVIGATE, routeName: 'Terms'}];

      yield put({type: RESET_NAVIGATION, index: 0, key: null, actions});
    }
  } else if (request.error && request.error.code === 400) {
    yield put({type: LOGOUT_REQUEST});
  }
};

const updateMe = function* (action) {
  const request = yield call(update, action.payload);

  if (request.response) {
    yield put({type: ME_UPDATE_REQUEST_SUCCESS, payload: request.response});
    yield put({
      type: ALERT_SUCCESS,
      payload: {description: 'Seus dados foram salvos.'},
    });
  }
};

const deleteMe = function* () {
  const request = yield call(removeMe);
  const actions = [{type: NAVIGATE, routeName: 'Login'}];

  if (request.response) {
    yield put({type: NAVIGATE, routeName: 'Login'});
    yield put({type: RESET_NAVIGATION, index: 0, key: null, actions});
    yield put({type: RESET_MENUS_REQUEST});
    yield put({
      type: ALERT_SUCCESS,
      payload: {
        description: 'Sua conta foi excluída. Obrigado por utilizar nosso app.',
      },
    });
  }
};

const resetPasswordMe = function* (action) {
  const request = yield call(resetPassword, action.payload);

  if (request) {
    yield put({
      type: ALERT_SUCCESS,
      payload: {description: 'Sua senha foi alterada.'},
    });
    yield put({type: NAVIGATE, routeName: 'Login'});
  }
};

const requestResetPasswordMe = function* (action) {
  const request = yield call(requestResetPassword, action.payload);

  if (request) {
    yield put({
      type: ALERT_SUCCESS,
      payload: {
        description:
          'Foi enviado um e-mail com as informações para reconfigurar sua senha.',
      },
    });
  }
};

const watchMeSaga = function* () {
  return yield [
    takeLatest(ME_REQUEST, fetch),
    takeLatest(ME_UPDATE_REQUEST, updateMe),
    takeLatest(ME_DELETE_REQUEST, deleteMe),
    takeLatest(ME_RESET_PASSWORD, resetPasswordMe),
    takeLatest(ME_REQUEST_PASSWORD, requestResetPasswordMe),
  ];
};

export default watchMeSaga;
