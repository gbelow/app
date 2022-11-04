import {
  CUSTOMER_SALE_REQUEST_SUCCESS,
  CUSTOMER_SALE_RESET_REQUEST_SUCCESS,
} from '../config/constants';

const initialState = {
  data: null,
};

const customerSaleReducer = (state = initialState, action) => {
  switch (action.type) {
    case CUSTOMER_SALE_REQUEST_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
      };
    }

    case CUSTOMER_SALE_RESET_REQUEST_SUCCESS: {
      return {
        ...state,
        data: null,
      };
    }

    default: {
      return state;
    }
  }
};

export default customerSaleReducer;
