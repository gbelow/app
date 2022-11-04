import {TERMS_REQUEST_SUCCESS} from '../config/constants';

const initialState = {
  data: null,
};

const termsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TERMS_REQUEST_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
      };
    }

    default: {
      return state;
    }
  }
};

export default termsReducer;
