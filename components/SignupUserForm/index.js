import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  Text,
  Alert,
  Switch,
  Keyboard,
  Modal,
} from 'react-native';

import {Touch} from 'react-native-kin-ui';

import RadioForm from 'react-native-simple-radio-button';
import Pdf from 'react-native-pdf';
import {FormInput, Button, TextLink} from '../../config/components';

import {appId} from '../../package.json';
import theme from '../../const/theme';
import styles from './styles';

var userRoles = [
  {label: 'Consumidor', value: 0},
  {label: 'Parceiro', value: 1},
];

class SignupUserForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    name: null,
    userRole: 0,
    email: null,
    cpf: null,
    cnpj: null,
    phone: null,
    birthday: null,
    termsAccepted: false,
    termsVisibility: false,
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
   * @name toggleUserTermsModal
   * @description focus the input
   * @return {Void}
   */
  toggleUserTermsModal() {
    this.setState({
      termsVisibility: !this.state.termsVisibility,
    });
  }

  /**
   * @name isFormInvalid
   * @description check form validation
   * @return {Boolean} according to form validation
   */
  get isFormInvalid() {
    let {
      userRole,
      name,
      email,
      cpf,
      cnpj,
      phone,
      password,
      confirmPassword,
      termsAccepted,
    } = this.state;

    return !(
      (userRole === 0 ? true : cnpj) &&
      name &&
      email &&
      cpf &&
      phone &&
      password &&
      confirmPassword &&
      termsAccepted
    );
  }

  /**
   * @name onTermsChange
   * @description change switch
   * @return {Void}
   */
  onTermsChange(termsAccepted) {
    Keyboard.dismiss();
    this.setState({termsAccepted});
  }

  /**
   * @name submitForm
   * @description
   * @return {Void}
   * */
  submitForm() {
    let {
      userRole,
      name,
      email,
      cpf,
      cnpj,
      phone,
      birthday,
      termsAccepted,
      password,
      confirmPassword,
    } = this.state;

    let error = false;

    if (!name) {
      error = 'Por favor preencha o nome.';
    } else if (!email) {
      error = 'Por favor preencha o email.';
    } else if (email && (!email.includes('@') || !email.includes('.'))) {
      error = 'Por favor preencha um email válido.';
    } else if (!cpf) {
      error = 'Por favor preencha o CPF.';
    } else if (cpf && cpf.length && cpf.replace(/[^0-9]/g, '').length < 11) {
      error = 'CPF inválido!';
    } else if (userRole === 1 && !cnpj) {
      error = 'Por favor preencha o CNPJ da sua loja.';
    } else if (
      userRole === 1 &&
      cnpj &&
      cnpj.length &&
      cnpj.replace(/[^0-9]/g, '').length < 14
    ) {
      error = 'Preencha um CNPJ válido.';
    } else if (
      birthday &&
      (birthday.length < 8 ||
        birthday.length === 9 ||
        birthday.substr(0, 2) > 31 ||
        birthday.substr(0, 2) <= 0 ||
        birthday.substr(3, 2) > 12 ||
        birthday.substr(3, 2) <= 0 ||
        (birthday.length === 10 &&
          birthday.substr(6, 4) < new Date().getFullYear() - 120) ||
        birthday.substr(6, 4) > new Date().getFullYear() - 14 ||
        birthday.substr(6, 4) <= 0)
    ) {
      error = 'Data de nascimento inválida.';
    } else if (!password) {
      error = 'Defina uma senha.';
    } else if (password.length < 4) {
      error = 'Sua senha deve possuir pelo menos 4 dígitos.';
    } else if (!confirmPassword) {
      error = 'Confirme sua senha.';
    } else if (confirmPassword !== password) {
      error = 'As senhas digitadas não coincidem.';
    } else if (!termsAccepted) {
      error = 'Você deve aceitar os termos para continuar.';
    }

    if (error) {
      Alert.alert('Atenção', error, [
        {
          text: 'Entendi',
        },
      ]);
    } else {
      let user = {
        userRole: userRole === 0 ? 'customer' : 'partner',
        name,
        email,
        cpf,
        phone,
        birthday,
        password,
      };

      let company = null;

      if (userRole === 1) {
        company = {
          cnpj,
        };
      }

      this.props.onSubmit({
        appId,
        authType: 'email',
        user,
        company,
      });
    }
  }

  handleLogin() {
    this.props.navigation.navigate('Login');
  }

  render() {
    let {userRole} = this.state;
    let refOnCpfSubmit = userRole === 0 ? 'phone' : 'company';

    if (this.state.termsVisibility) {
      return (
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.termsVisibility}
          onRequestClose={this.toggleUserTermsModal.bind(this)}>
          <View style={styles.modaContainer}>
            <View style={styles.modaInner}>
              {this.props.terms.data && (
                <Pdf
                  source={{uri: this.props.terms.data, cache: true}}
                  style={styles.pdf}
                />
              )}
              <View style={styles.modalButtonContainer}>
                <TextLink
                  onPress={this.toggleUserTermsModal.bind(this)}
                  text="Fechar"
                />
              </View>
            </View>
          </View>
        </Modal>
      );
    }

    return (
      <ScrollView style={styles.container}>
        <View style={styles.inner}>
          <View>
            <View style={styles.radioContainer}>
              <RadioForm
                radio_props={userRoles}
                initial={0}
                formHorizontal={true}
                labelHorizontal={true}
                buttonColor="#333"
                labelStyle={styles.radioLabel}
                onPress={(value) => {
                  this.setState({userRole: value});
                }}
              />
            </View>
            <FormInput
              iconRightName="user"
              autoCapitalize="none"
              value={this.state.name}
              placeholder="Nome Completo *"
              ref="name"
              reference="name"
              returnKeyType="next"
              onChangeText={(name) => this.setState({name})}
              onSubmitEditing={this.focusOn.bind(this, 'email')}
            />
            <FormInput
              iconRightName="envelope"
              autoCapitalize="none"
              value={this.state.email}
              placeholder="E-mail *"
              ref="email"
              reference="email"
              returnKeyType="next"
              onChangeText={(email) => this.setState({email})}
              onSubmitEditing={this.focusOn.bind(this, 'cpf')}
            />
            <FormInput
              iconRightName="id-card"
              ref="cpf"
              value={this.state.cpf}
              placeholder="CPF *"
              returnKeyType="next"
              mask="000.000.000-00"
              maxLength={14}
              keyboardType="numeric"
              onChangeText={(cpf) => this.setState({cpf})}
              onSubmitEditing={this.focusOn.bind(this, refOnCpfSubmit)}
            />
            {this.state.userRole === 1 && (
              <FormInput
                iconRightName="building"
                ref="company"
                value={this.state.cnpj}
                placeholder="CNPJ da loja *"
                returnKeyType="done"
                mask="00.000.000.0000-00"
                maxLength={18}
                keyboardType="numeric"
                blurOnSubmit={true}
                onChangeText={(cnpj) => this.setState({cnpj})}
                onSubmitEditing={this.focusOn.bind(this, 'phone')}
              />
            )}
            <FormInput
              iconRightName="phone-square"
              ref="phone"
              placeholder="Telefone *"
              returnKeyType="done"
              mask="(00)00000-0000"
              maxLength={14}
              keyboardType="phone-pad"
              value={this.state.phone}
              onChangeText={(phone) => this.setState({phone})}
              onSubmitEditing={this.focusOn.bind(this, 'birthday')}
            />
            <FormInput
              iconRightName="birthday-cake"
              ref="birthday"
              placeholder="Nascimento"
              returnKeyType="next"
              mask="00/00/0000"
              maxLength={10}
              keyboardType="numeric"
              value={this.state.birthday}
              onChangeText={(birthday) => this.setState({birthday})}
              onSubmitEditing={this.focusOn.bind(this, 'password')}
            />
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
            {!this.props.termsAccepted && (
              <View>
                <View style={styles.termsContainer}>
                  <Switch
                    value={this.state.termsAccepted}
                    onValueChange={this.onTermsChange.bind(this)}
                  />
                  <View style={styles.termsTextContainer}>
                    <Text style={styles.termsText}>Concordo com os </Text>
                    <Touch onPress={this.toggleUserTermsModal.bind(this)}>
                      <Text style={styles.linkText}>Termos de Uso</Text>
                    </Touch>
                  </View>
                </View>
              </View>
            )}
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

export default SignupUserForm;
