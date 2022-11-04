import {REDIRECT, REDIRECT_RESET} from '../config/constants';

export const redirect = (payload) => ({
  type: REDIRECT,
  payload,
});

export const redirectReset = () => ({
  type: REDIRECT_RESET,
});
