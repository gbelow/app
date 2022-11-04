import {
  USER_DEVICE_SAVE_REQUEST_SUCCESS,
  USER_DEVICE_SEND_REQUEST_SUCCESS,
} from '../config/constants';

const initialState = {
  data: null,
  sent: false,
};

const userDeviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DEVICE_SAVE_REQUEST_SUCCESS: {
      return {
        ...state,
        data: action.payload,
      };
    }

    case USER_DEVICE_SEND_REQUEST_SUCCESS: {
      return {
        ...state,
        sent: true,
      };
    }

    default: {
      return state;
    }
  }
};

export default userDeviceReducer;
