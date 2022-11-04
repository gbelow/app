import {takeLatest, put} from 'redux-saga/effects';

import {FOREGROUND, BACKGROUND} from 'redux-enhancer-react-native-appstate';

import {store} from '../app';

import {ME_REQUEST, LOGOUT_REQUEST} from '../config/constants';

const handleForeground = function* () {
  const {session, connection} = store.getState();

  if (connection && session.logged) {
    yield put({type: ME_REQUEST, payload: {hideActivity: true}});
  }
};

const handleBackground = function* () {};

const watchAppStateSaga = function* () {
  return yield [
    takeLatest(FOREGROUND, handleForeground),
    takeLatest(BACKGROUND, handleBackground),
  ];
};

export default watchAppStateSaga;
