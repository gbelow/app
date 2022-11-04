import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';

import {SignupAMCForm} from '../../config/components';

import {sessionRegisterRequest} from '../../actions/sessionActions';
import theme from '../../const/theme';
import styles from './styles';

class RegisterAMC extends React.Component {
  static navigationOptions = () => ({
    header: null,
    drawerLockMode: 'locked-closed',
  });

  /**
   * @name handleSubmit
   * @description finish user registration
   * @return {Void}
   */
  handleSubmit(cpf) {
    const {session} = this.props;

    const user = {
      cpf,
      userId: session.data.userId,
    };

    this.props.register({user});
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
          Preencha o seu CPF para continuar.
        </Text>
        {session.data && (
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : -150}
            style={styles.formContainer}>
            <SignupAMCForm onSubmit={this.handleSubmit.bind(this)} />
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterAMC);
