import {CONTENT_REQUEST, CONTENT_RESET_REQUEST} from '../config/constants';

export const contentRequest = (payload) => ({
  type: CONTENT_REQUEST,
  payload,
});

export const contentResetRequest = () => ({
  type: CONTENT_RESET_REQUEST,
});
