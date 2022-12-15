import React from 'react';
import {connect} from 'react-redux';

import {View, Platform, BackHandler} from 'react-native';

import NetInfo from '@react-native-community/netinfo';

import {ScreenLoading} from 'react-native-kin-ui';

import {addNavigationHelpers} from 'react-navigation';
import FlashMessage from 'react-native-flash-message';

import {RootNav} from '../../config/router';

import {customNavigate} from '../../actions/navigateActions';
// import OneSignal from 'react-native-onesignal';
import updateConnection from '../../actions/connectionActions';
import styles from './styles';

class App extends React.Component {
  constructor(props) {
    super(props);

    // OneSignal.addEventListener('opened', (openResult) => {
    //   const { additionalData } = openResult.notification.payload;

    //   if(additionalData && additionalData.menu) {
    //     this.props.dispatch(customNavigate(additionalData.menu));
    //   }
    // });
  }

  componentDidMount() {
    NetInfo.addEventListener((state) => {
      let {isConnected} = state;
      this.props.dispatch(updateConnection(isConnected));
    });

    if (Platform.OS === 'android') {
      this.backEvent = BackHandler.addEventListener(
        'hardwareBackPress',
        this.handleBack.bind(this),
      );
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      this.backEvent.remove();
    }
  }

  /**
   * @name handleBack
   * @description callback when user navigates to back
   * @return {Void}
   * */
  handleBack() {
    const navigation = addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.nav,
    });

    // User are in the tutorial screen
    navigation.goBack();
    return true;
  }

  render() {
    const {dispatch, activity, nav} = this.props;

    const navigation = addNavigationHelpers({
      dispatch,
      state: nav,
    });

    return (
      <View style={styles.container}>
        <RootNav navigation={navigation} />
        {activity.visibility && <ScreenLoading />}
        <FlashMessage position="top" />
      </View>
    );
  }
}

const mapStateToProps = ({dispatch, activity, nav}) => ({
  dispatch,
  activity,
  nav,
});

const connectApp = connect(mapStateToProps)(App);
export {connectApp as App, RootNav};
