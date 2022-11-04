import {put, call, takeLatest} from 'redux-saga/effects';

import {fetchFeed} from '../services/rssFeedApi';
import {RSS_FEED_REQUEST, RSS_FEED_REQUEST_SUCCESS} from '../config/constants';

const fetchContent = function* () {
  const request = yield call(fetchFeed);

  if (request.content) {
    yield put({
      type: RSS_FEED_REQUEST_SUCCESS,
      payload: {data: request.content},
    });
  }
};

const watchRssFeedSaga = function* () {
  return yield [takeLatest(RSS_FEED_REQUEST, fetchContent)];
};

export default watchRssFeedSaga;
