import {CAVABEN_REQUEST, PRODUCT_DETAIL_REQUEST} from '../config/constants';

export const cavabenRequest = (payload) => ({
  type: CAVABEN_REQUEST,
  payload,
});

export const productDetailRequest = (payload) => ({
  type: PRODUCT_DETAIL_REQUEST,
  payload,
});
