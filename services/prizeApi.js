import {request} from './request';

export function fetch(params) {
  return request({
    url: `user/${params.user.userId}/action/${params.action.actionId}/prizes`,
  });
}

export function confirm(params) {
  let data = {};

  if (params.data.option) {
    data = {
      code: params.data.option.code,
    };
  }

  return request({
    url: `user/${params.user.userId}/action/${params.action.actionId}/prizes/${params.data.prize.prizeId}/confirm`,
    method: 'POST',
    data,
  });
}
