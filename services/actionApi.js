import {request} from './request';

import {store} from '../app';

export function fetch(data) {
  const {session, action} = store.getState();

  return request(
    {
      url: `action/${data.actionId}/user/${session.data.user.userId}`,
    },
    {
      hideActivity: action.data ? true : false,
    },
  );
}

export function fetchHistory(user) {
  const {session} = store.getState();

  return request({
    url: `user/${session.data.user.userId}/actionHistory`,
  });
}

export function fetchTerms(action) {
  return request({
    url: `action/${action.actionId}/useTerm`,
  });
}

export function subscribe() {
  const {session, action} = store.getState();

  return request({
    url: `action/${action.data.actionId}/user/${session.data.user.userId}/join`,
    method: 'POST',
  });
}
