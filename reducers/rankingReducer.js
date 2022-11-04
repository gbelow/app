import {
  RANKING_REQUEST_SUCCESS,
  RANKING_RESET_REQUEST_SUCCESS,
} from '../config/constants';

const initialState = {
  data: null,
};

const rankingReducer = (state = initialState, action) => {
  switch (action.type) {
    case RANKING_REQUEST_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
      };
    }

    case RANKING_RESET_REQUEST_SUCCESS: {
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

export default rankingReducer;
