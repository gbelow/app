import {
  SALES_HISTORY_REQUEST,
  ACTIONS_HISTORY_REQUEST,
} from '../config/constants';

export const salesHistoryRequest = (payload) => ({
  type: SALES_HISTORY_REQUEST,
  payload,
});

export const actionsHistoryRequest = () => ({
  type: ACTIONS_HISTORY_REQUEST,
});
