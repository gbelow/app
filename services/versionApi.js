import {Platform} from 'react-native';
import {request} from './request';
import {packageName, androidVersion, iosVersion} from '../package.json';

export function fetchVersion() {
  return request({
    url: `http://kincode.com.br/${packageName}/version.json`,
  });
}

export function sendVersion() {
  return request(
    {
      url: 'app/version',
      method: 'POST',
      data: {
        version: `${Platform.OS === 'android' ? androidVersion : iosVersion}`,
      },
    },
    {
      hideActivity: true,
    },
  );
}
