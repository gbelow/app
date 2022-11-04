import {REFRESH_REQUEST, REFRESH_REQUEST_SUCCESS} from '../config/constants';

const taskRefreshReducer = (state = {}, action) => {
  switch (action.type) {
    case REFRESH_REQUEST: {
      return {
        ...state,
        data: true,
      };
    }

    case REFRESH_REQUEST_SUCCESS: {
      return {
        ...state,
        data: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default taskRefreshReducer;
