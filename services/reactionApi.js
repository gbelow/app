import {request} from './request';
import {store} from '../app';

function send(data) {
  const {session} = store.getState();

  return request(
    {
      url: `user/${session.data.user.userId}/content/${data.contentId}/reaction`,
      method: 'POST',
      data: {
        like: data.reaction,
      },
    },
    {
      hideActivity: true,
    },
  );
}

export default send;
