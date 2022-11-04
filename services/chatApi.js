import {request} from './request';
import {store} from '../app';

export function fetch() {
  const {session} = store.getState();

  return request(
    {
      url: `user/${session.data.user.userId}/chat`,
    },
    {
      hideActivity: true,
    },
  );
}

export function send(data) {
  const {session} = store.getState();

  return request(
    {
      url: `user/${session.data.user.userId}/chat`,
      method: 'POST',
      data,
    },
    {
      hideActivity: true,
    },
  );
}
