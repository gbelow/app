import {request} from './request';

function fetch(action) {
  return request({
    url: `action/${action.actionId}/ranking`,
  });
}

export default fetch;
