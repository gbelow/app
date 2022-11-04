import {CHAT_REQUEST_SUCCESS, CHAT_SAVE_REQUEST} from '../config/constants';

const initialState = {
  data: null,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_REQUEST_SUCCESS: {
      return {
        ...state,
        data: action.payload,
      };
    }

    case CHAT_SAVE_REQUEST: {
      if (state.data) {
        return {
          ...state,
          data: action.payload.concat(state.data),
        };
      }

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

export default chatReducer;
