import {takeLatest, put} from 'redux-saga/effects';

import {store} from '../app';

import {
  CONNECTION_CHANGED,
  CHAT_SEND_REQUEST,
  CHAT_RESET_REQUEST,
} from '../config/constants';

const handleConnectionChange = function* (action) {
  const {chatPendingMessages} = store.getState();

  if (action.payload && chatPendingMessages.data) {
    yield put({type: CHAT_SEND_REQUEST, payload: chatPendingMessages.data});
    yield put({type: CHAT_RESET_REQUEST});
  }
};

const watchConnectionSaga = function* () {
  return yield [takeLatest(CONNECTION_CHANGED, handleConnectionChange)];
};

export default watchConnectionSaga;
