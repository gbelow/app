import {PRIZES_REQUEST, PRIZE_CONFIRM_REQUEST} from '../config/constants';

export const prizesRequest = (payload) => ({
  type: PRIZES_REQUEST,
  payload,
});

export const prizeConfirmRequest = (payload) => ({
  type: PRIZE_CONFIRM_REQUEST,
  payload,
});
