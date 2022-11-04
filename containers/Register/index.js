import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';

import {SignupForm} from '../../config/components';

import {sessionRegisterRequest} from '../../actions/sessionActions';
import theme from '../../const/theme';
import styles from './styles';

class Register extends React.Component {
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
    const {session} = this.props;

    const user = {
      userRole: data.user.userRole,
      name: session.data.fbData.name,
      email: data.user.email,
      cpf: data.user.cpf,
      accessToken: session.data.fbData.accessToken,
      userId: session.data.fbData.id,
    };

    this.props.register({user, company: data.company});
  }

  render() {
    const {session} = this.props;

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.statusBarBackground}
          hidden={false}
          translucent={false}
        />
        <Text style={styles.title}>Registro</Text>
        <Text style={styles.description}>
          Preencha os dados abaixo para continuar.
        </Text>
        {session.data && session.data.fbData && (
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : -150}
            style={styles.formContainer}>
            <SignupForm
              email={session.data.fbData && session.data.fbData.email}
              onSubmit={this.handleSubmit.bind(this)}
            />
          </KeyboardAvoidingView>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({session}) => ({
  session,
});

const mapDispatchToProps = (dispatch) => ({
  register: (payload) => {
    dispatch(sessionRegisterRequest(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
