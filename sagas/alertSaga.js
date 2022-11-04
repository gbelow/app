import {call, takeLatest, put} from 'redux-saga/effects';

import {Alert} from 'react-native';
import {ALERT_ERROR, ALERT_SUCCESS, LOGOUT_REQUEST} from '../config/constants';

// @name showErrorAlert
// @description show an alert message with error message
// @params { Object } action redux action
const showErrorAlert = function* (action) {
  const {title, description} = action.payload;
  yield call(Alert.alert, title || 'Ooops', description);

  // Error 401 / 403 redirects user to login page
  if (action.payload.resetSession) {
    yield put({type: LOGOUT_REQUEST});
  }
};

// @name showSuccessAlert
// @description show an alert message with success message
// @params { Object } action redux action
const showSuccessAlert = function* (action) {
  const {title, description} = action.payload;
  yield call(Alert.alert, title || 'Sucesso', description);
};

const watchAlertSaga = function* () {
  return yield [
    takeLatest(ALERT_ERROR, showErrorAlert),
    takeLatest(ALERT_SUCCESS, showSuccessAlert),
  ];
};

export default watchAlertSaga;
