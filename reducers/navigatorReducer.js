import {RootNav} from '../config/router';

const navigatorReducer = (state, action) => {
  const nextState = RootNav.router.getStateForAction(action, state);

  return nextState || state;
};

export default navigatorReducer;
