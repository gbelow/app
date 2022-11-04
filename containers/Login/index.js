import React from 'react';
import {connect} from 'react-redux';
// import FBSDK from 'react-native-fbsdk';
import {Text, View, Image, Alert, Animated, Platform} from 'react-native';

import {
  Button,
  FacebookButton,
  SettingsModal,
  LoginForm,
} from '../../config/components';

import {Touch} from 'react-native-kin-ui';
import {name, appId, mode} from '../../package.json';
import {
  sessionFacebookLoginRequest,
  sessionFormLoginRequest,
} from '../../actions/sessionActions';
import {settingsSubmitRequest} from '../../actions/settingsActions';
import theme from '../../const/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import images from '../../const/images';
import styles from './styles';

// const {
//   GraphRequest,
//   GraphRequestManager,
// } = FBSDK;

class Login extends React.Component {
  static navigationOptions = () => ({
    header: null,
    drawerLockMode: 'locked-closed',
  });

  state = {
    fadeAnim: new Animated.Value(0),
    showSettings: false,
  };

  componentWillMount() {
    setTimeout(() => {
      this.animateButton();
    }, 300);
  }

  animateButton() {
    const options = {
      toValue: 1,
      duration: 500,
    };

    Animated.timing(this.state.fadeAnim, options).start();
  }

  enterWithoutLogin() {
    this.props.navigation.navigate('HomePublic');
  }

  // /**
  //  * @name Login
  //  * @description Login with facebook
  //  * @return {Void}
  // */
  // submitFacebookLogin() {
  //   const { LoginManager } = FBSDK;
  //   const { connection } = this.props;
  //
  //   if (connection) {
  //     Platform.OS === 'ios' ? LoginManager.setLoginBehavior('web') : LoginManager.setLoginBehavior('web_only');
  //
  //     LoginManager.logOut();
  //
  //     LoginManager.logInWithReadPermissions(['public_profile', 'email'])
  //       .then(
  //         this.afterLoginWithSuccess.bind(this),
  //         this.afterLoginWithError.bind(this),
  //       );
  //   } else {
  //     Alert.alert(
  //       'Ooops',
  //       'Você está sem conexão no momento.',
  //       [{ text: 'OK' }], { cancelable: false },
  //     );
  //   }
  // }
  //
  // /**
  //  * @name afterLoginWithSuccess
  //  * @description callback after facebook logged with success
  //  * @param {Object} result
  //  * @return {Void}
  // */
  // afterLoginWithSuccess(result) {
  //   const { AccessToken } = FBSDK;
  //
  //   if (!result.isCancelled) {
  //     AccessToken.getCurrentAccessToken().then((data) => {
  //       // TODO - INTEGRATE WITH REDUX
  //       // this.props.facebookLogin({ access_token: data.accessToken })
  //
  //       const accessToken = data.accessToken;
  //
  //       const responseInfoCallback = (error, result) => {
  //          if (error) {
  //            alert('Ocorreu um erro inesperado.');
  //          } else {
  //            this.props.submitFacebookLogin({
  //              fbData: result,
  //              accessToken,
  //            });
  //          }
  //        }
  //
  //        const infoRequest = new GraphRequest(
  //          '/me',
  //          {
  //            accessToken: accessToken,
  //            parameters: {
  //              fields: {
  //                string: 'email,name'
  //              }
  //            }
  //          },
  //          responseInfoCallback
  //        );
  //
  //       new GraphRequestManager().addRequest(infoRequest).start()
  //     });
  //   }
  // }

  /**
   * @name afterLoginWithError
   * @description callback after facebook logged with error
   * @return {Object} result
   * @return {Void}
   */
  afterLoginWithError = () => {
    Alert.alert('Ooops', 'Ocorreu um erro inesperado.', [{text: 'OK'}], {
      cancelable: false,
    });
  };

  toggleSettings = () => {
    this.setState({
      showSettings: !this.state.showSettings,
    });
  };

  handleSettingsSubmit = (settings) => {
    this.props.submitSettings(settings);

    this.toggleSettings();
  };

  submitFormLogin(data) {
    this.props.submitFormLogin(data);
  }

  handleRegisterUser() {
    this.props.navigation.navigate('RegisterUser');
  }

  handleRecoverAccount() {
    this.props.navigation.navigate('RecoverAccount');
  }

  render() {
    const {fadeAnim} = this.state;

    return (
      <Animated.View style={[styles.container, {opacity: fadeAnim}]}>
        <Image source={images.logos.login} style={styles.image} />
        <LoginForm onSubmit={this.submitFormLogin.bind(this)} />
        <Touch onPress={this.handleRegisterUser.bind(this)}>
          <Text style={styles.registerText}>Registre-se aqui</Text>
        </Touch>
        <Touch onPress={this.handleRecoverAccount.bind(this)}>
          <Text style={styles.registerText}>Esqueci minha senha</Text>
        </Touch>
        {theme.loginHeaderLeftImage && (
          <Image
            source={theme.loginHeaderLeftImage}
            style={styles.headerLeftImage}
          />
        )}
        {theme.loginFooterRightImage && (
          <Image
            source={theme.loginFooterRightImage}
            style={styles.footerRightImage}
          />
        )}
        {theme.loginHeaderFullImage && (
          <Image
            source={theme.loginHeaderFullImage}
            style={styles.headerFullImage}
          />
        )}
        {theme.loginFooterFullImage && (
          <Image
            source={theme.loginFooterFullImage}
            style={styles.footerFullImage}
          />
        )}
      </Animated.View>
    );
  }
}

const mapStateToProps = ({session, connection, settings}) => ({
  session,
  connection,
  settings,
});

const mapDispatchToProps = (dispatch) => ({
  submitFacebookLogin: (payload) => {
    dispatch(sessionFacebookLoginRequest(payload));
  },
  submitFormLogin: (payload) => {
    dispatch(sessionFormLoginRequest(payload));
  },
  submitSettings: (settings) => {
    dispatch(settingsSubmitRequest(settings));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
