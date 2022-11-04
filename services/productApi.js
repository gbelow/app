import {request} from './request';
import {store} from '../app';

export function fetch(categoryId) {
  const {session} = store.getState();

  return request({
    url: `user/${session.data.user.userId}/products/${categoryId}`,
  });
}

export function fetchDetail(contentId) {
  const {session} = store.getState();

  return request({
    url: `user/${session.data.user.userId}/contentDetail/${contentId}`,
  });
}
