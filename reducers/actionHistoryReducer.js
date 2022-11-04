import {ACTIONS_HISTORY_REQUEST_SUCCESS} from '../config/constants';

const initialState = {
  data: null,
};

const actionHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS_HISTORY_REQUEST_SUCCESS: {
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

export default actionHistoryReducer;
