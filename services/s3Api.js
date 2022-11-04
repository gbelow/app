import {request} from './request';
import {store} from '../app';

export function send(data) {
  const {session} = store.getState();

  return request({
    url: `user/${session.data ? session.data.user.userId : 0}/pilot-photo`,
    method: 'POST',
    data,
  });
}
