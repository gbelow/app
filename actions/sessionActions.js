import {
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  REGISTER_REQUEST,
  FORM_LOGIN_REQUEST,
  REGISTER_USER_REQUEST,
} from '../config/constants';

export const sessionFacebookLoginRequest = (payload) => ({
  type: LOGIN_REQUEST,
  payload,
});

export const sessionFormLoginRequest = (payload) => ({
  type: FORM_LOGIN_REQUEST,
  payload,
});

export const sessionLogoutRequest = (payload) => ({
  type: LOGOUT_REQUEST,
  payload,
});

export const sessionRegisterRequest = (payload) => ({
  type: REGISTER_REQUEST,
  payload,
});

export const sessionRegisterUserRequest = (payload) => ({
  type: REGISTER_USER_REQUEST,
  payload,
});
