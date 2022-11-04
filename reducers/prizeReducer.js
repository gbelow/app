import {
  PRIZES_REQUEST_SUCCESS,
  PRIZES_RESET_REQUEST_SUCCESS,
} from '../config/constants';

const initialState = {
  data: null,
};

const prizeReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRIZES_REQUEST_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
      };
    }

    case PRIZES_RESET_REQUEST_SUCCESS: {
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

export default prizeReducer;
