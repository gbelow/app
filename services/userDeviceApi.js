import {request} from './request';
import {store} from '../app';

function send() {
  const {session, device} = store.getState();

  return request(
    {
      url: 'user/devices',
      method: 'PUT',
      data: {
        userId: session.data.user.userId,
        deviceId: device.data.userId,
      },
    },
    {
      hideActivity: true,
    },
  );
}

export default send;
