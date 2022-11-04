import {
  ACTIVITY_INDICATOR_TOGGLE,
  ACTIVITY_INDICATOR_SHOW,
  ACTIVITY_INDICATOR_HIDE,
} from '../config/constants';

export const activityIndicatorToggle = () => ({
  type: ACTIVITY_INDICATOR_TOGGLE,
});

export const activityIndicatorShow = () => ({
  type: ACTIVITY_INDICATOR_SHOW,
});

export const activityIndicatorHide = () => ({
  type: ACTIVITY_INDICATOR_HIDE,
});
