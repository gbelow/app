import {PRODUCTS_REQUEST_SUCCESS} from '../config/constants';

const initialState = {
  data: null,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_REQUEST_SUCCESS: {
      return {
        ...state,
        data: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};

export default productsReducer;
