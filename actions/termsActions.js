import {
  TERMS_REQUEST,
  USER_TERMS_REQUEST,
  TERMS_ACCEPT_REQUEST,
} from '../config/constants';

export const termsRequest = () => ({
  type: TERMS_REQUEST,
});

export const userTermsRequest = () => ({
  type: USER_TERMS_REQUEST,
});

export const termsAcceptRequest = () => ({
  type: TERMS_ACCEPT_REQUEST,
});
