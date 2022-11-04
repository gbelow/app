import React from 'react';
import PropTypes from 'prop-types';
import {View, ScrollView, Alert, Keyboard} from 'react-native';

import {FormInput, Button, TextLink} from '../../config/components';

import {appId} from '../../package.json';
import theme from '../../const/theme';
import styles from './styles';

class RecoverPasswordForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {};

  /**
   * @name focus
   * @description focus the input
   * @return {Void}
   */
  focusOn(ref = 'password') {
    this.refs[ref].focus();
  }

  /**
   * @name isFormInvalid
   * @description check form validation
   * @return {Boolean} according to form validation
   */
  get isFormInvalid() {
    let {password, confirmPassword} = this.state;

    return !(password && confirmPassword);
  }

  /**
   * @name submitForm
   * @description
   * @return {Void}
   * */
  submitForm() {
    let {password, confirmPassword} = this.state;

    let error = false;

    if (!password) {
      error = 'Defina uma senha.';
    } else if (password.length < 4) {
      error = 'Sua senha deve possuir pelo menos 4 dígitos.';
    } else if (!confirmPassword) {
      error = 'Confirme sua senha.';
    } else if (confirmPassword !== password) {
      error = 'As senhas digitadas não coincidem.';
    }

    if (error) {
      Alert.alert('Atenção', error, [
        {
          text: 'Entendi',
        },
      ]);
    } else {
      let user = {
        password,
      };

      let company = null;

      this.props.onSubmit({
        newPassword: password,
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
              secureTextEntry
              iconRightName="key"
              ref="password"
              placeholder="Senha *"
              returnKeyType="next"
              value={this.state.password}
              onChangeText={(password) => this.setState({password})}
              onSubmitEditing={this.focusOn.bind(this, 'confirmPassword')}
            />
            <FormInput
              secureTextEntry
              iconRightName="key"
              ref="confirmPassword"
              placeholder="Confirmar senha *"
              returnKeyType="next"
              value={this.state.confirmPassword}
              onChangeText={(confirmPassword) =>
                this.setState({confirmPassword})
              }
              onSubmitEditing={Keyboard.dismiss.bind(this)}
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

export default RecoverPasswordForm;
