import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';

import {RecoverPasswordForm} from '../../config/components';

import {sessionRegisterRequest} from '../../actions/sessionActions';
import {meRequestPassword, meResetPassword} from '../../actions/meActions';
import theme from '../../const/theme';
import styles from './styles';
import packageJson from '../../package.json';

class ResetPassword extends React.Component {
  static navigationOptions = () => ({
    header: null,
    drawerLockMode: 'locked-closed',
  });

  /**
   * @name handleSubmit
   * @description finish user registration
   * @return {Void}
   */
  handleSubmit(data) {
    const {params} = this.props.navigation.state;
    this.props.resetPassword({...data, hash: params.token});
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
        <Text style={styles.title}>Alterar Senha</Text>
        <Text style={styles.description}>Insira sua nova senha.</Text>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : -150}
          style={styles.formContainer}>
          <RecoverPasswordForm
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
  resetPassword: (payload) => {
    dispatch(meResetPassword(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
