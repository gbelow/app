import {ACTION_TERMS_REQUEST_SUCCESS} from '../config/constants';

const initialState = {
  data: null,
};

const actionTermsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TERMS_REQUEST_SUCCESS: {
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

export default actionTermsReducer;
