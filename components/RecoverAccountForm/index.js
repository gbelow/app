import React from 'react';
import PropTypes from 'prop-types';
import {View, ScrollView, Alert, Keyboard} from 'react-native';

import {FormInput, Button, TextLink} from '../../config/components';

import {appId} from '../../package.json';
import theme from '../../const/theme';
import styles from './styles';

class RecoverAccountForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    userRole: 0,
    email: null,
  };

  /**
   * @name focus
   * @description focus the input
   * @return {Void}
   */
  focusOn(ref = 'email') {
    this.refs[ref].focus();
  }

  /**
   * @name isFormInvalid
   * @description check form validation
   * @return {Boolean} according to form validation
   */
  get isFormInvalid() {
    let {email} = this.state;

    return !email;
  }

  /**
   * @name submitForm
   * @description
   * @return {Void}
   * */
  submitForm() {
    let {email} = this.state;

    let error = false;

    if (!email) {
      error = 'Por favor preencha o email.';
    } else if (email && (!email.includes('@') || !email.includes('.'))) {
      error = 'Por favor preencha um email válido.';
    }

    if (error) {
      Alert.alert('Atenção', error, [
        {
          text: 'Entendi',
        },
      ]);
    } else {
      this.props.onSubmit({
        appId,
        email,
      });
    }
  }

  handleLogin() {
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.inner}>
          <View>
            <FormInput
              iconRightName="envelope"
              autoCapitalize="none"
              value={this.state.email}
              placeholder="E-mail *"
              ref="email"
              reference="email"
              returnKeyType="next"
              onChangeText={(email) => this.setState({email})}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              label="Confirmar"
              onPress={this.submitForm.bind(this)}
              uppercase={true}
              disabled={this.isFormInvalid}
              backgroundColor={theme.yellowLight}
              color={theme.white}
            />
            <TextLink
              onPress={this.handleLogin.bind(this)}
              text="Fazer login"
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default RecoverAccountForm;
