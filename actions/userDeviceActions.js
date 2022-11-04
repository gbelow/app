import {
  USER_DEVICE_SAVE_REQUEST,
  USER_DEVICE_SEND_REQUEST,
} from '../config/constants';

export const userDeviceSaveRequest = (payload) => ({
  type: USER_DEVICE_SAVE_REQUEST,
  payload,
});

export const userDeviceSendRequest = () => ({
  type: USER_DEVICE_SEND_REQUEST,
});
