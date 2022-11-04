import {PUBLIC_MENUS_REQUEST_SUCCESS} from '../config/constants';

const initialState = {
  data: null,
};

const publicMenusReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUBLIC_MENUS_REQUEST_SUCCESS: {
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

export default publicMenusReducer;
