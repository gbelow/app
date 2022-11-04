import {delay} from 'redux-saga';

import {put, call, takeLatest} from 'redux-saga/effects';

import {
  fbLogin,
  formLogin,
  register,
  registerUser,
} from '../services/sessionApi';

import {
  ALERT_SUCCESS,
  FIRST_ACCESS_REQUEST,
  REGISTER_REQUEST,
  REGISTER_REQUEST_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_REQUEST_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  FORM_LOGIN_REQUEST,
  LOGOUT_REQUEST,
  LOGOUT_REQUEST_SUCCESS,
  CUSTOMERS_REQUEST,
  TERMS_ACCEPT_REQUEST,
  USER_DEVICE_SEND_REQUEST,
  RESET_MENUS_REQUEST,
  NAVIGATE,
  RESET_NAVIGATION,
  ALERT_ERROR,
} from '../config/constants';

import {appId} from '../package.json';

const signup = function* (action) {
  const request = yield call(register, action.payload);

  if (request.response) {
    yield put({type: REGISTER_REQUEST_SUCCESS, payload: request.response});
    yield put({type: CUSTOMERS_REQUEST, payload: request.response.data.user});
    yield put({type: TERMS_ACCEPT_REQUEST});
    yield put({type: NAVIGATE, routeName: 'AppNav'});
  }
};

const signupUser = function* (action) {
  const request = yield call(registerUser, action.payload);

  if (request.response) {
    yield put({type: REGISTER_USER_REQUEST_SUCCESS, payload: request.response});
    // yield put({ type: ALERT_SUCCESS, payload: { description: request.response.message } });

    let {payload} = action;

    let loginData = {
      login: payload.user.email,
      password: payload.user.password,
      authType: appId === 'amc' ? 'consistem' : 'email',
      appId: appId,
    };

    yield put({type: FORM_LOGIN_REQUEST, payload: loginData});
  }
};

const fbSignin = function* (action) {
  const request = yield call(fbLogin, action.payload);

  if (request.error && request.error.code === 400) {
    yield put({type: FIRST_ACCESS_REQUEST, payload: action.payload});
    yield put({type: NAVIGATE, routeName: 'Register'});
  } else if (request.response) {
    yield put({type: LOGIN_REQUEST_SUCCESS, payload: request.response});
    yield put({type: CUSTOMERS_REQUEST, payload: request.response.data.user});
    yield put({type: NAVIGATE, routeName: 'AppNav'});
    yield put({type: USER_DEVICE_SEND_REQUEST});
  }
};

const formSignin = function* (action) {
  const request = yield call(formLogin, action.payload);

  if (request.error && request.error.description) {
    yield put({
      type: ALERT_ERROR,
      payload: {description: request.error.description},
    });
    yield put({type: NAVIGATE, routeName: 'Login'});
  } else if (request.response) {
    if (request.response.data && request.response.data.user) {
      yield put({type: LOGIN_REQUEST_SUCCESS, payload: request.response});
      yield put({type: CUSTOMERS_REQUEST, payload: request.response.data.user});
      yield put({type: NAVIGATE, routeName: 'AppNav'});
      yield put({type: USER_DEVICE_SEND_REQUEST});
    } else {
      yield put({type: FIRST_ACCESS_REQUEST, payload: action.payload});
      yield put({type: NAVIGATE, routeName: 'RegisterAMC'});
    }
  }
};

const logout = function* () {
  const actions = [{type: NAVIGATE, routeName: 'Login'}];

  yield put({type: RESET_NAVIGATION, index: 0, key: null, actions});
  yield put({type: RESET_MENUS_REQUEST});
  yield put({type: LOGOUT_REQUEST_SUCCESS});
};

const watchSessionSaga = function* () {
  return yield [
    takeLatest(REGISTER_REQUEST, signup),
    takeLatest(REGISTER_USER_REQUEST, signupUser),
    takeLatest(LOGIN_REQUEST, fbSignin),
    takeLatest(FORM_LOGIN_REQUEST, formSignin),
    takeLatest(LOGOUT_REQUEST, logout),
  ];
};

export default watchSessionSaga;
