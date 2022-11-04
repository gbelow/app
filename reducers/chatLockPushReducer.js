import {
  CHAT_PUSH_LOCK_REQUEST,
  CHAT_PUSH_UNLOCK_REQUEST,
} from '../config/constants';

const initialState = {
  locked: false,
};

const chatLockPushReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_PUSH_LOCK_REQUEST: {
      return {
        locked: true,
      };
    }

    case CHAT_PUSH_UNLOCK_REQUEST: {
      return {
        locked: false,
      };
    }

    default: {
      return state;
    }
  }
};

export default chatLockPushReducer;
