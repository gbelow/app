import {
  SALES_HISTORY_REQUEST_SUCCESS,
  SALES_INCREMENT_LAST_SALE_ID_SUCCESS,
} from '../config/constants';

const initialState = {
  data: null,
};

const salesHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SALES_HISTORY_REQUEST_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        meta: action.payload.meta,
      };
    }

    case SALES_INCREMENT_LAST_SALE_ID_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        meta: action.payload.meta,
      };
    }

    default: {
      return state;
    }
  }
};

export default salesHistoryReducer;
