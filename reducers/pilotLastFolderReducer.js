import {PILOT_LAST_FOLDER_REQUEST} from '../config/constants';

const initialState = {
  data: null,
};

const pilotLastFolderReducer = (state = initialState, action) => {
  switch (action.type) {
    case PILOT_LAST_FOLDER_REQUEST: {
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

export default pilotLastFolderReducer;
