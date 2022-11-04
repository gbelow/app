import {request} from './request';
import {store} from '../app';

export function fetchMenus() {
  const {session} = store.getState();

  return request({
    url: `user/${session.data.user.userId}/menu`,
  });
}

export function fetchPublicMenus() {
  return request({
    url: 'user/0/menu',
  });
}
