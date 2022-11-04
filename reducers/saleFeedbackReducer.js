import {
  SALE_SINCRONIZE_REQUEST_SUCCESS,
  SALE_FEEDBACK_RESET_REQUEST,
} from '../config/constants';

const initialState = {
  data: null,
};

const saleFeedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case SALE_SINCRONIZE_REQUEST_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        meta: action.payload.meta,
      };
    }

    case SALE_FEEDBACK_RESET_REQUEST: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};

export default saleFeedbackReducer;
