import {put, call, takeLatest} from 'redux-saga/effects';

import {fetchFolders} from '../services/pilotPhotosApi';

import {
  PILOT_FOLDERS_REQUEST,
  PILOT_FOLDERS_REQUEST_SUCCESS,
} from '../config/constants';

const _fetchFolders = function* () {
  const request = yield call(fetchFolders);

  if (request.response) {
    yield put({type: PILOT_FOLDERS_REQUEST_SUCCESS, payload: request.response});
  }
};

const watchPilotPhotosSaga = function* () {
  return yield [takeLatest(PILOT_FOLDERS_REQUEST, _fetchFolders)];
};

export default watchPilotPhotosSaga;
