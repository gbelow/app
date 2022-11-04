import {request} from './request';

import {store} from '../app';

export function fetchTerms() {
  const {session} = store.getState();

  let userId;

  if (session.data.fbData) {
    userId = session.data.fbData.id;
  } else {
    userId = session.data.user.userId;
  }

  return request({
    url: `user/${userId}/useTerm`,
    method: 'GET',
  });
}

export function fetchUserTerms() {
  return request({
    url: 'kincode/terms',
  });
}

export function accept(user) {
  const {session} = store.getState();

  let userId;

  if (session.data.fbData) {
    userId = session.data.fbData.id;
  } else {
    userId = session.data.user.userId;
  }

  return request({
    url: `user/${userId}/useTerm/accept`,
    method: 'POST',
  });
}
