import {request} from './request';
import {store} from '../app';

export function fetch() {
  const {session} = store.getState();

  return request(
    {
      url: `user/${session.data.user.userId}/customers`,
    },
    {
      hideActivity: true,
    },
  );
}

export function create(customer) {
  const {session} = store.getState();

  return request({
    url: `user/${session.data.user.userId}/customers`,
    method: 'POST',
    data: {
      customer,
    },
  });
}

export function update(customer) {
  const {session} = store.getState();

  return request({
    url: `user/${session.data.user.userId}/customers`,
    method: 'POST',
    data: {
      customer,
    },
  });
}
