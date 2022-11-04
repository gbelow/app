import {
  SALE_SINCRONIZE_REQUEST,
  SALE_LOCAL_REQUEST,
  SALE_LOCAL_CREATE_REQUEST,
  SALE_LOCAL_DELETE_REQUEST,
  SALE_FEEDBACK_RESET_REQUEST,
} from '../config/constants';

export const saleSincronizeRequest = () => ({
  type: SALE_SINCRONIZE_REQUEST,
});

export const saleRequest = (payload) => ({
  type: SALE_LOCAL_REQUEST,
  payload,
});

export const saleCreateRequest = (payload) => ({
  type: SALE_LOCAL_CREATE_REQUEST,
  payload,
});

export const saleDeleteRequest = (payload) => ({
  type: SALE_LOCAL_DELETE_REQUEST,
  payload,
});

export const saleFeedbackReset = (payload) => ({
  type: SALE_FEEDBACK_RESET_REQUEST,
});
