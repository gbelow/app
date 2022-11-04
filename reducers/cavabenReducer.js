import {CAVABEN_REQUEST_SUCCESS} from '../config/constants';

const initialState = {
  data: null,
};

const cavabenReducer = (state = initialState, action) => {
  switch (action.type) {
    case CAVABEN_REQUEST_SUCCESS: {
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

export default cavabenReducer;
