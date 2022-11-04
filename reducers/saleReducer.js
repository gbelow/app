import {
  SALE_SINCRONIZE_REQUEST_SUCCESS,
  SALE_LOCAL_CREATE_REQUEST_SUCCESS,
  SALE_LOCAL_DELETE_REQUEST_SUCCESS,
} from '../config/constants';

const initialState = {
  data: [],
};

const saleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SALE_LOCAL_CREATE_REQUEST_SUCCESS: {
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    }

    case SALE_LOCAL_DELETE_REQUEST_SUCCESS: {
      return {
        ...state,
        data: state.data.filter(
          (sale) => sale.saleId !== action.payload.saleId,
        ),
      };
    }

    case SALE_SINCRONIZE_REQUEST_SUCCESS: {
      return {
        ...state,
        data: [],
      };
    }

    default: {
      return state;
    }
  }
};

export default saleReducer;
