import {SETTINGS_SUBMIT_REQUEST} from '../config/constants';

export const settingsSubmitRequest = (payload) => ({
  type: SETTINGS_SUBMIT_REQUEST,
  payload,
});
