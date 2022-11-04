import {
  NOTIFICATIONS_REQUEST_SUCCESS,
  NOTIFICATIONS_ARCHIVE_REQUEST_SUCCESS,
} from '../config/constants';

const initialState = {
  data: null,
  meta: null,
};

const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATIONS_REQUEST_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        meta: action.payload.meta,
      };
    }

    case NOTIFICATIONS_ARCHIVE_REQUEST_SUCCESS: {
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

export default notificationsReducer;
