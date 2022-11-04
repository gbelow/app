import {
  CUSTOMERS_REQUEST,
  CUSTOMER_SALE_REQUEST,
  CUSTOMER_CREATE_REQUEST,
  CUSTOMER_SALE_RESET_REQUEST,
  CUSTOMER_UPDATE_REQUEST,
} from '../config/constants';

export const customersRequest = (payload) => ({
  type: CUSTOMERS_REQUEST,
  payload,
});

export const customerCreateRequest = (payload) => ({
  type: CUSTOMER_CREATE_REQUEST,
  payload,
});

export const customerUpdateRequest = (payload) => ({
  type: CUSTOMER_UPDATE_REQUEST,
  payload,
});

export const customerSaleCreateRequest = (payload) => ({
  type: CUSTOMER_SALE_REQUEST,
  payload,
});

export const resetSaleCustomer = () => ({
  type: CUSTOMER_SALE_RESET_REQUEST,
});
