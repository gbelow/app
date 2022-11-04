import {request} from './request';
import {store} from '../app';

export function fetch(limit) {
  const {session, notifications} = store.getState();

  return request(
    {
      url: `user/${session.data.user.userId}/notifications?offset=0&limit=${limit}`,
    },
    {
      hideActivity: notifications.data && limit === 10 ? true : false,
    },
  );
}

export function archive(notification) {
  const {session} = store.getState();

  return request(
    {
      url: `user/${session.data.user.userId}/notifications/readall?lastNotificationId=${notification.notificationId}`,
      method: 'POST',
    },
    {
      hideActivity: true,
    },
  );
}
