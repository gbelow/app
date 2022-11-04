import {FAQ_REQUEST_SUCCESS} from '../config/constants';

const initialState = {
  data: null,
};

const faqReducer = (state = initialState, action) => {
  switch (action.type) {
    case FAQ_REQUEST_SUCCESS: {
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

export default faqReducer;
