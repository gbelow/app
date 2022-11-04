import {
  CONTENT_REQUEST_SUCCESS,
  CONTENT_RESET_REQUEST,
  REACTION_SEND_REQUEST_SUCCESS,
} from '../config/constants';

const initialState = {
  data: null,
};

const contentReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTENT_REQUEST_SUCCESS: {
      return {
        ...state,
        data: {
          items: action.payload.items.data,
          category: action.payload.category,
        },
      };
    }

    case REACTION_SEND_REQUEST_SUCCESS: {
      if (state.data && state.data.items) {
        let items = state.data.items.map((item, index) => {
          if (item.contentId === action.payload.contentId) {
            item.reaction = action.payload.reaction;
          }
          return item;
        });

        return {
          ...state,
          data: {
            items,
            category: state.category,
          },
        };
      }
    }

    case CONTENT_RESET_REQUEST: {
      return initialState;
    }

    default: {
      return state;
    }
  }
};

export default contentReducer;
