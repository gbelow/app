import {SETTINGS_SUBMIT_REQUEST} from '../config/constants';

const initialState = {
  data: null,
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SETTINGS_SUBMIT_REQUEST: {
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

export default settingsReducer;
