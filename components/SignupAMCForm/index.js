import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Alert, Switch, Keyboard} from 'react-native';

import {Touch} from 'react-native-kin-ui';

import RadioForm from 'react-native-simple-radio-button';

import {FormInput, TermsModal, Button} from '../../config/components';

import theme from '../../const/theme';
import styles from './styles';

class SignupAMCForm extends React.Component {
  static propTypes = {
    cpf: PropTypes.string,
    buttonLabel: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    buttonLabel: 'Confirmar',
  };

  state = {
    cpf: null,
  };

  componentDidMount() {
    this.setState({
      cpf: this.props.cpf,
    });
  }

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
    let {cpf} = this.state;

    return !cpf;
  }

  /**
   * @name submitForm
   * @description
   * @return {Void}
   * */
  submitForm() {
    let {cpf} = this.state;

    let error = false;

    if (!cpf) {
      error = 'Por favor preencha o CPF.';
    } else if (cpf && cpf.length && cpf.replace(/[^0-9]/g, '').length < 11) {
      error = 'CPF inválido!';
    }

    if (error) {
      Alert.alert('Atenção', error, [
        {
          text: 'Entendi',
        },
      ]);
    } else {
      this.props.onSubmit(cpf);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inner}>
          <FormInput
            iconRightName="id-card"
            ref="cpf"
            value={this.state.cpf}
            placeholder="Seu CPF *"
            returnKeyType="next"
            mask="000.000.000-00"
            maxLength={14}
            keyboardType="numeric"
            onChangeText={(cpf) => this.setState({cpf})}
            onSubmitEditing={() => Keyboard.dismiss()}
          />
          <View style={styles.buttonContainer}>
            <Button
              label={this.props.buttonLabel}
              onPress={this.submitForm.bind(this)}
              uppercase={true}
              disabled={this.isFormInvalid}
              backgroundColor={theme.yellowLight}
              color={theme.white}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default SignupAMCForm;
