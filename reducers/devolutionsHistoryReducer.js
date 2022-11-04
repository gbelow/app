import {DEVOLUTIONS_HISTORY_REQUEST_SUCCESS} from '../config/constants';

const initialState = {
  data: null,
};

const devolutionsHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case DEVOLUTIONS_HISTORY_REQUEST_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        meta: action.payload.meta,
      };
    }

    default: {
      return state;
    }
  }
};

export default devolutionsHistoryReducer;
