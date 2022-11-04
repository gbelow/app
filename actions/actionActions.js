import {
  ACTION_REQUEST,
  ACTION_TERMS_REQUEST,
  ACTION_SUBSCRIBE_REQUEST,
  ACTION_RESET_REQUEST,
} from '../config/constants';

export const actionRequest = (payload) => ({
  type: ACTION_REQUEST,
  payload,
});

export const actionSubscribeRequest = () => ({
  type: ACTION_SUBSCRIBE_REQUEST,
});

export const actionTermsRequest = (payload) => ({
  type: ACTION_TERMS_REQUEST,
  payload,
});

export const actionResetRequest = () => ({
  type: ACTION_RESET_REQUEST,
});
