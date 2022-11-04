import {takeLatest, put, call} from 'redux-saga/effects';

import send from '../services/reactionApi';
import {store} from '../app';

import {
  REACTION_SEND_REQUEST,
  REACTION_SEND_REQUEST_SUCCESS,
} from '../config/constants';

const sendReaction = function* (action) {
  const request = yield call(send, action.payload);

  if (request.response) {
    if (request.response.data) {
      request.response.data.like = action.payload.reaction;
    }

    yield put({
      type: REACTION_SEND_REQUEST_SUCCESS,
      payload: {
        contentId: action.payload.contentId,
        reaction: request.response.data,
      },
    });
  }
};

const watchReactionSaga = function* () {
  return yield [takeLatest(REACTION_SEND_REQUEST, sendReaction)];
};

export default watchReactionSaga;
