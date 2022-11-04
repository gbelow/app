import {put, call, takeLatest} from 'redux-saga/effects';

import moment from 'moment';
import {fetch, send} from '../services/chatApi';

import {
  CHAT_REQUEST,
  CHAT_REQUEST_SUCCESS,
  CHAT_SEND_REQUEST,
  CHAT_SEND_REQUEST_SUCCESS,
} from '../config/constants';

const _fetch = function* () {
  const request = yield call(fetch);

  if (request.response) {
    const messages = request.response.data.map((item) => ({
      _id: item.messageId,
      createdAt: moment(item.date, 'DD-MM-YYYY HH:mm:ss'),
      text: item.message,
      user: {
        _id: item.sender,
        name: item.sender,
      },
      sent: true,
    }));

    yield put({type: CHAT_REQUEST_SUCCESS, payload: messages});
  }
};

const _send = function* (action) {
  const messages = action.payload.map((item) => ({
    date: moment(item.createdAt).format('DD/MM/YYYY HH:mm:ss'),
    message: item.text,
  }));

  const request = yield call(send, messages);

  if (request.response) {
    yield put({type: CHAT_SEND_REQUEST_SUCCESS});
    yield put({type: CHAT_REQUEST, payload: {hideActivity: true}});
  }
};

const watchChatSaga = function* () {
  return yield [
    takeLatest(CHAT_REQUEST, _fetch),
    takeLatest(CHAT_SEND_REQUEST, _send),
  ];
};

export default watchChatSaga;
