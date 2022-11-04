import {
  FIRST_ACCESS_REQUEST,
  ME_REQUEST_SUCCESS,
  ME_UPDATE_REQUEST_SUCCESS,
  LOGIN_REQUEST_SUCCESS,
  LOGOUT_REQUEST_SUCCESS,
  REGISTER_REQUEST_SUCCESS,
} from '../config/constants';

const initialState = {
  logged: false,
  data: null,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIRST_ACCESS_REQUEST: {
      return {
        ...state,
        logged: false,
        data: action.payload,
      };
    }

    case REGISTER_REQUEST_SUCCESS: {
      return {
        ...state,
        logged: true,
        data: action.payload.data,
      };
    }

    case LOGIN_REQUEST_SUCCESS: {
      return {
        ...state,
        logged: true,
        data: action.payload.data,
      };
    }

    case ME_REQUEST_SUCCESS: {
      return {
        ...state,
        logged: true,
        data: action.payload.data,
      };
    }

    case ME_UPDATE_REQUEST_SUCCESS: {
      return {
        ...state,
        logged: true,
        data: action.payload.data,
      };
    }

    case LOGOUT_REQUEST_SUCCESS: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};

export default sessionReducer;
