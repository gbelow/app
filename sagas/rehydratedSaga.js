import {put, takeLatest} from 'redux-saga/effects';

import {REHYDRATE} from 'redux-persist';

import {NAVIGATE, RESET_NAVIGATION} from '../config/constants';

import {store} from '../app';

const redirect = function* redirect() {
  const {session} = store.getState();

  if (session.data && session.logged) {
    yield put({type: NAVIGATE, routeName: 'Home'});
  } else {
    yield put({type: NAVIGATE, routeName: 'Login'});
  }
};

const watchRehydratedSaga = function* watchRehydratedSaga() {
  return yield [takeLatest(REHYDRATE, redirect)];
};

export default watchRehydratedSaga;
