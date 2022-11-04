import {CHAT_SAVE_REQUEST, CHAT_RESET_REQUEST} from '../config/constants';

const initialState = {
  data: null,
};

const chatPendingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_SAVE_REQUEST: {
      if (state.data) {
        return {
          ...state,
          data: state.data.concat(action.payload),
        };
      }

      return {
        ...state,
        data: action.payload,
      };
    }

    case CHAT_RESET_REQUEST: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};

export default chatPendingReducer;
