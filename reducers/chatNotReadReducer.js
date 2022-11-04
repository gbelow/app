import {
  CHAT_NOT_READ_INCREMENT_REQUEST,
  CHAT_NOT_READ_ARCHIVE_REQUEST,
} from '../config/constants';

const initialState = 0;

const chatNotReadReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_NOT_READ_INCREMENT_REQUEST: {
      return state + 1;
    }

    case CHAT_NOT_READ_ARCHIVE_REQUEST: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};

export default chatNotReadReducer;
