import {RSS_FEED_REQUEST_SUCCESS} from '../config/constants';

const initialState = {
  data: null,
};

const rssFeedReducer = (state = initialState, action) => {
  switch (action.type) {
    case RSS_FEED_REQUEST_SUCCESS: {
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

export default rssFeedReducer;
