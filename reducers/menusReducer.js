import {MENUS_REQUEST_SUCCESS, RESET_MENUS_REQUEST} from '../config/constants';

const initialState = {
  data: null,
};

const menusReducer = (state = initialState, action) => {
  switch (action.type) {
    case MENUS_REQUEST_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
      };
    }

    case RESET_MENUS_REQUEST: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};

export default menusReducer;
