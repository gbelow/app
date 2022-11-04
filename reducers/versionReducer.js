import {VERSION_REQUEST_SUCCESS} from '../config/constants';

const initialState = {
  data: null,
};

const versionReducer = (state = initialState, action) => {
  switch (action.type) {
    case VERSION_REQUEST_SUCCESS: {
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

export default versionReducer;
