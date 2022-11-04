import {PILOT_FOLDERS_REQUEST_SUCCESS} from '../config/constants';

const initialState = {
  data: null,
};

const pilotFoldersReducer = (state = initialState, action) => {
  switch (action.type) {
    case PILOT_FOLDERS_REQUEST_SUCCESS: {
      return {
        ...state,
        data: action.payload.diretorios,
      };
    }

    default: {
      return state;
    }
  }
};

export default pilotFoldersReducer;
