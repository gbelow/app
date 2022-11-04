import {REDIRECT, REDIRECT_RESET} from '../config/constants';

const initialState = null;

const redirectReducer = (state = initialState, action) => {
  switch (action.type) {
    case REDIRECT: {
      return action.payload;
    }

    case REDIRECT_RESET: {
      return null;
    }

    default: {
      return state;
    }
  }
};

export default redirectReducer;
