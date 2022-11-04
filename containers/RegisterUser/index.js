import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
} from 'react-native';

import {SignupUserForm} from '../../config/components';

import {userTermsRequest} from '../../actions/termsActions';
import {sessionRegisterRequest} from '../../actions/sessionActions';
import theme from '../../const/theme';
import styles from './styles';

class RegisterUser extends React.Component {
  static navigationOptions = () => ({
    header: null,
    drawerLockMode: 'locked-closed',
  });

  componentDidMount() {
    this.props.loadTerms();
  }

  /**
   * @name handleSubmit
   * @description finish user registration
   * @return {Void}
   */
  handleSubmit(data) {
    this.props.registerUser(data);
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
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : -150}
          style={styles.formContainer}>
          <SignupUserForm
            navigation={this.props.navigation}
            terms={this.props.terms}
            onSubmit={this.handleSubmit.bind(this)}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = ({session, terms}) => ({
  session,
  terms,
});

const mapDispatchToProps = (dispatch) => ({
  registerUser: (payload) => {
    dispatch(sessionRegisterRequest(payload));
  },
  loadTerms: () => {
    dispatch(userTermsRequest());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUser);
