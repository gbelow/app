import {S3_SEND_REQUEST} from '../config/constants';

export const s3SendRequest = (payload) => ({
  type: S3_SEND_REQUEST,
  payload,
});
