import {request} from './request';
import {store} from '../app';

export function fetch() {
  const {session} = store.getState();

  return request({
    url: `user/${session.data.user.userId}/digital-stamps`,
  });
}
