import {request} from './request';

import {store} from '../app';

export function fetchMe(extraOptions) {
  const {session} = store.getState();
  const user = {};

  if (session.data) {
    if (session.data.user) {
      user.userId = session.data.user.userId;
    } else {
      user.userId = session.data.fbData.id;
    }

    return request(
      {
        url: `user/${user.userId}`,
      },
      extraOptions,
    );
  }

  return {};
}

export function update(data) {
  return request({
    url: '/user',
    method: 'POST',
    data,
  });
}

export function requestResetPassword(data) {
  return request({
    url: '/aplicativo/requestPasswordReset/',
    method: 'POST',
    data,
  });
}

export function resetPassword(data) {
  const {hash, newPassword} = data;
  return request({
    url: `/aplicativo/resetPassword/${hash}`,
    method: 'POST',
    data: {newPassword},
  });
}

export function deleteMe() {
  const {session} = store.getState();

  return request({
    url: `user/${session.data.user.userId}`,
    method: 'DELETE',
  });
}
