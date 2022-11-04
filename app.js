import React from 'react';
import {Linking} from 'react-native';
import {createStore, applyMiddleware, compose} from 'redux';

import {Provider} from 'react-redux';

import {createLogger} from 'redux-logger';

import {persistStore} from 'redux-persist';

// import OneSignal from 'react-native-onesignal';
import createSagaMiddleware from 'redux-saga';
import applyAppStateListener from 'redux-enhancer-react-native-appstate';
import reducers from './reducers';
import sagas from './sagas';
import SplashScreen from 'react-native-splash-screen';

import {userDeviceSaveRequest} from './actions/userDeviceActions';
import {RootNav} from './config/router';

import {App} from './containers/App';
import {Text, View} from 'react-native';

// Redux middlewares
const sagaMiddleware = createSagaMiddleware();
const logger = createLogger();

// mount it on the Store
export const store = createStore(
  reducers,
  undefined,
  compose(applyAppStateListener(), applyMiddleware(logger, sagaMiddleware)),
);

sagaMiddleware.run(sagas);
persistStore(store, null);

class index extends React.Component {
  componentDidMount() {
    // OneSignal.configure();
    // OneSignal.addEventListener('ids', (device) => {
    //   store.dispatch(userDeviceSaveRequest(device));
    // });
    Linking.addEventListener('url', (event) => this.handleOpenURL(event.url));
    Linking.getInitialURL().then((url) => url && this.handleOpenURL(url));
    SplashScreen.hide();
  }

  componentWillUnmount() {
    // OneSignal.removeEventListener('ids', this.onIds);
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  handleOpenURL(url) {
    const path = url.split('://')[1];
    const action = RootNav.router.getActionForPathAndParams(path);
    store.dispatch(action);
  }

  render() {
    // return (
    //   <View>
    //     <Text> TESTE AMC CORE APP 2</Text>
    //   </View>
    // )
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default index;
