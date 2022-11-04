import {
  DEVOLUTION_SINCRONIZE_REQUEST,
  DEVOLUTIONS_HISTORY_REQUEST,
} from '../config/constants';

export const devolutionSincronizeRequest = (payload) => ({
  type: DEVOLUTION_SINCRONIZE_REQUEST,
  payload,
});

export const devolutionsHistoryRequest = () => ({
  type: DEVOLUTIONS_HISTORY_REQUEST,
});
