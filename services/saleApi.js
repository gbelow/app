import {request} from './request';
import {store} from '../app';

export function fetch() {
  const {session} = store.getState();

  return request(
    {
      url: `user/${session.data.user.userId}/sales?limit=25`,
    },
    {
      hideActivity: true,
    },
  );
}

export function sincronize() {
  const {session, history, sales} = store.getState();

  return request({
    url: `user/${session.data.user.userId}/sales`,
    method: 'POST',
    data: sales.data,
  });
}
