import {
  ACTION_REQUEST_SUCCESS,
  ACTION_RESET_REQUEST,
} from '../config/constants';

const initialState = {
  data: null,
};

const actionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_REQUEST_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
      };
    }

    case ACTION_RESET_REQUEST: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};

export default actionReducer;
