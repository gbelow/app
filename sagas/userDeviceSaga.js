import {put, call, takeLatest} from 'redux-saga/effects';

import {store} from '../app';

import send from '../services/userDeviceApi';
import {
  USER_DEVICE_SEND_REQUEST,
  USER_DEVICE_SEND_REQUEST_SUCCESS,
  USER_DEVICE_SAVE_REQUEST,
  USER_DEVICE_SAVE_REQUEST_SUCCESS,
} from '../config/constants';

const saveUserDevice = function* (action) {
  const {device} = store.getState();

  if (!device.data) {
    yield put({
      type: USER_DEVICE_SAVE_REQUEST_SUCCESS,
      payload: action.payload,
    });
  }

  if (!device.sent) {
    yield put({type: USER_DEVICE_SEND_REQUEST});
  }
};

const sendUserDevice = function* () {
  const {device, session, connection} = store.getState();

  if (
    device.data &&
    !device.sent &&
    session.data &&
    session.data.user &&
    connection
  ) {
    const request = yield call(send);

    if (request.response) {
      yield put({type: USER_DEVICE_SEND_REQUEST_SUCCESS});
    }
  }
};

const watchUserDeviceSaga = function* () {
  return yield [
    takeLatest(USER_DEVICE_SAVE_REQUEST, saveUserDevice),
    takeLatest(USER_DEVICE_SEND_REQUEST, sendUserDevice),
  ];
};

export default watchUserDeviceSaga;
