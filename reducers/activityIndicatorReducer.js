import {
  ACTIVITY_INDICATOR_TOGGLE,
  ACTIVITY_INDICATOR_SHOW,
  ACTIVITY_INDICATOR_HIDE,
} from '../config/constants';

const initialState = {
  visibility: false,
};

const activityIndicatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVITY_INDICATOR_SHOW: {
      return {
        visibility: true,
      };
    }

    case ACTIVITY_INDICATOR_HIDE: {
      return {
        visibility: false,
      };
    }

    case ACTIVITY_INDICATOR_TOGGLE: {
      return {
        visibility: !state.visibility,
      };
    }

    default: {
      return state;
    }
  }
};

export default activityIndicatorReducer;
