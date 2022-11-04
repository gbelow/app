import {request} from './request';
import {store} from '../app';

export function fetch() {
  const {session} = store.getState();

  let userId = session.data && session.data.user ? session.data.user.userId : 0;

  return request({
    url: `user/${userId}/faq`,
  });
}
