import {
  ME_REQUEST,
  ME_UPDATE_REQUEST,
  ME_DELETE_REQUEST,
  ME_REQUEST_PASSWORD,
  ME_RESET_PASSWORD,
} from '../config/constants';

export const meRequest = (payload) => ({
  type: ME_REQUEST,
  payload,
});

export const meUpdateRequest = (payload) => ({
  type: ME_UPDATE_REQUEST,
  payload,
});

export const meDeleteRequest = () => {
  return {
    type: ME_DELETE_REQUEST,
  };
};
export const meRequestPassword = (payload) => {
  return {
    type: ME_REQUEST_PASSWORD,
    payload,
  };
};

export const meResetPassword = (payload) => {
  return {
    type: ME_RESET_PASSWORD,
    payload,
  };
};
