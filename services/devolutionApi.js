import {request} from './request';
import {store} from '../app';

export function sincronize(devolution) {
  const {session, devolutionsHistory} = store.getState();

  let {lastDevolutionId} = devolutionsHistory.meta;

  if (!lastDevolutionId) {
    lastDevolutionId = 0;
  }

  devolution.devolutionId = lastDevolutionId + 1;

  return request({
    url: `user/${session.data.user.userId}/devolutions`,
    method: 'POST',
    data: [devolution],
  });
}

export function fetchHistory() {
  const {session} = store.getState();

  return request({
    url: `user/${session.data.user.userId}/devolutions`,
  });
}
