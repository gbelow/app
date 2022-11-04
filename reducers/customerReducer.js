import {
  CUSTOMERS_REQUEST_SUCCESS,
  CUSTOMER_CREATE_REQUEST_SUCCESS,
} from '../config/constants';

const initialState = {
  data: null,
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CUSTOMERS_REQUEST_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        meta: action.payload.meta,
      };
    }

    case CUSTOMER_CREATE_REQUEST_SUCCESS: {
      return {
        ...state,
        data: [...state.data, action.payload.data],
      };
    }

    default: {
      return state;
    }
  }
};

export default customerReducer;
