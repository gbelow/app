import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';

import {RecoverAccountForm} from '../../config/components';

import {sessionRegisterRequest} from '../../actions/sessionActions';
import {meRequestPassword} from '../../actions/meActions';
import theme from '../../const/theme';
import styles from './styles';

class RecoverAccount extends React.Component {
  static navigationOptions = () => ({
    header: null,
    drawerLockMode: 'locked-closed',
  });

  /**
   * @name handleSubmit
   * @description finish user registration
   * @return {Void}
   */
  handleSubmit({appId, email}) {
    const data = {
      userId: `${appId}-${email}`,
      appId: appId,
    };
    // console.log(data);
    this.props.requestPassword(data);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.statusBarBackground}
          hidden={false}
          translucent={false}
        />
        <Text style={styles.title}>Recupere sua conta</Text>
        <Text style={styles.description}>
          Insira o email vinculado à sua conta para continuar.
        </Text>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : -150}
          style={styles.formContainer}>
          <RecoverAccountForm
            navigation={this.props.navigation}
            onSubmit={this.handleSubmit.bind(this)}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = ({session}) => ({
  session,
});

const mapDispatchToProps = (dispatch) => ({
  requestPassword: (payload) => {
    dispatch(meRequestPassword(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RecoverAccount);
