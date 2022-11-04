import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Keyboard, Switch} from 'react-native';

import {Button, TextLink, PDFModal} from '../../config/components';

import {FormInput} from 'react-native-kin-ui';

import {appId} from '../../package.json';
import theme from '../../const/theme';
import styles from './styles';

class LoginForm extends React.Component {
  state = {
    login: null,
    password: null,
    termsAccepted: true,
    termsVisible: false,
    authType: appId === 'amc' ? 'consistem' : 'email',
    appId,
  };

  focusOn(key) {
    this.refs[key].focus();
  }

  onChangeTerms() {
    this.setState({
      termsAccepted: !this.state.termsAccepted,
    });
  }

  toggleTermsModal() {
    this.setState({
      termsVisible: !this.state.termsVisible,
    });
  }

  handdleSubmit() {
    if (this.state.login && this.state.password) {
      // && this.state.termsAccepted
      this.props.onSubmit(this.state);
    }

    Keyboard.dismiss();
  }

  render() {
    return (
      <View style={styles.container}>
        <FormInput
          ref="login"
          placeholder="E-mail"
          value={this.state.login}
          keyboardType="default"
          autoCapitalize="none"
          onChangeText={(login) => this.setState({login})}
          onSubmitEditing={() => this.focusOn('password')}
          placeholderTextColor={theme.inputTextColor}
          style={{color: theme.inputTextColor}}
        />
        <FormInput
          ref="password"
          placeholder="Senha"
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={(password) => this.setState({password})}
          onSubmitEditing={() => this.handdleSubmit()}
          placeholderTextColor={theme.inputTextColor}
          style={{color: theme.inputTextColor}}
        />
        {
          // <View style={styles.switchContainer}>
          //   <Switch
          //     value={this.state.termsAccepted}
          //     onValueChange={this.onChangeTerms.bind(this)}
          //   />
          //   <Text style={styles.termsText}>
          //     Concordo com os
          //   </Text>
          //   <TextLink
          //     onPress={this.toggleTermsModal.bind(this)}
          //     text="termos"
          //   />
          // </View>
          // <PDFModal
          //   uri="https://blbapp001.blob.core.windows.net/dzarmstorage/filename-1540174255"
          //   visible={this.state.termsVisible}
          //   onClose={this.toggleTermsModal.bind(this)}
          // />
        }
        <Button
          onPress={this.handdleSubmit.bind(this)}
          label="Fazer login"
          disabled={
            !this.state.login ||
            !this.state.password ||
            !this.state.termsAccepted
          }
          backgroundColor={theme.colorPrimary}
          accessibilityLabel="Botão de login"
        />
      </View>
    );
  }
}

export default LoginForm;
