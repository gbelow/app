import {takeLatest, call, put} from 'redux-saga/effects';

import {fetch, archive} from '../services/notification';

import {store} from '../app';

import {
  NOTIFICATIONS_REQUEST,
  NOTIFICATIONS_REQUEST_SUCCESS,
  NOTIFICATIONS_ARCHIVE_REQUEST,
  NOTIFICATIONS_ARCHIVE_REQUEST_SUCCESS,
  ME_REQUEST,
} from '../config/constants';

const fetchNotifications = function* (action) {
  const request = yield call(fetch, action.payload);

  if (request.response) {
    yield put({type: NOTIFICATIONS_REQUEST_SUCCESS, payload: request.response});
  }
};

const archiveNotifications = function* (action) {
  const request = yield call(archive, action.payload);

  if (request.response) {
    yield put({
      type: NOTIFICATIONS_ARCHIVE_REQUEST_SUCCESS,
      payload: request.response,
    });
    yield put({type: ME_REQUEST, payload: {hideActivity: true}});
  }
};

const watchNotifications = function* () {
  return yield [
    takeLatest(NOTIFICATIONS_REQUEST, fetchNotifications),
    takeLatest(NOTIFICATIONS_ARCHIVE_REQUEST, archiveNotifications),
  ];
};

export default watchNotifications;
