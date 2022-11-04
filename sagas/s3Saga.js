import {put, call, takeLatest} from 'redux-saga/effects';

import {send} from '../services/s3Api';

import {
  BACK,
  ALERT_ERROR,
  ALERT_SUCCESS,
  S3_SEND_REQUEST,
  S3_SEND_REQUEST_SUCCESS,
  ACTIVITY_INDICATOR_SHOW,
  ACTIVITY_INDICATOR_HIDE,
  PILOT_LAST_FOLDER_REQUEST,
} from '../config/constants';

import {RNS3} from 'react-native-aws3';

const sendFile = function* (action) {
  const data = action.payload;
  let error = false;

  const options = {
    keyPrefix: `pilot-photos/${data.directory ? data.directory + '/' : ''}`,
    bucket: 'adapcon-amc-kincode-upload',
    region: 'sa-east-1',
    accessKey: 'AKIAIRCRUR2F56XKQ4GQ',
    secretKey: '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',
    successActionStatus: 201,
  };

  let photos = [
    {
      uri: data.frontPicture,
      name: `${data.pf}-${data.name}-frente.jpg`,
      type: 'image/jpg',
      from: 'frente',
    },
    {
      uri: data.backPicture,
      name: `${data.pf}-${data.name}-costas.jpg`,
      type: 'image/jpg',
      from: 'costas',
    },
  ];

  if (data.detailPicture) {
    photos.push({
      uri: data.detailPicture,
      name: `${data.pf}-${data.name}-detalhe.jpg`,
      type: 'image/jpg',
      from: 'detalhe',
    });
  }

  if (data.sidePicture) {
    photos.push({
      uri: data.sidePicture,
      name: `${data.pf}-${data.name}-lateral.jpg`,
      type: 'image/jpg',
      from: 'lateral',
    });
  }

  let payload = {
    pf: data.pf,
    name: data.name,
    directory: data.directory,
    photos: [],
  };

  yield put({type: ACTIVITY_INDICATOR_SHOW});

  for (let file of photos) {
    yield RNS3.put(file, options).then((response) => {
      if (response.status !== 201) {
        error = true;
      } else {
        if (response.body && response.body.postResponse) {
          payload.photos.push({
            location: response.body.postResponse.location,
            type: file.from,
          });
        }
      }
    });
  }

  if (!error) {
    const request = yield call(send, payload);

    if (request.response) {
      yield put({type: S3_SEND_REQUEST_SUCCESS, payload: request.response});
      yield put({type: PILOT_LAST_FOLDER_REQUEST, payload: data.directory});
      yield put({
        type: ALERT_SUCCESS,
        payload: {description: 'Suas fotos foram enviadas'},
      });
      yield put({type: BACK});
    }
  } else if (error) {
    yield put({
      type: ALERT_ERROR,
      payload: {description: 'Falha ao enviar imagens'},
    });
  }
};

const watchS3Saga = function* () {
  return yield [takeLatest(S3_SEND_REQUEST, sendFile)];
};

export default watchS3Saga;
