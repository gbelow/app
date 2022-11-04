import {request} from './request';
import {store} from '../app';

function fetch(menu) {
  const {session} = store.getState();

  let userId = session.data ? session.data.user.userId : 0;

  return request({
    url: `user/${userId}/content/${menu.categoryId}`,
  });
}

export default fetch;
