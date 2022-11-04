import {STAMPS_REQUEST_SUCCESS} from '../config/constants';

const initialState = {
  data: null,
};

const stampReducer = (state = initialState, action) => {
  switch (action.type) {
    case STAMPS_REQUEST_SUCCESS: {
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

export default stampReducer;
