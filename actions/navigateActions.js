import {NAVIGATE_REQUEST, CUSTOM_NAVIGATE_REQUEST} from '../config/constants';

export const navigate = (payload) => ({
  type: NAVIGATE_REQUEST,
  payload,
});

export const customNavigate = (payload) => ({
  type: CUSTOM_NAVIGATE_REQUEST,
  payload,
});
