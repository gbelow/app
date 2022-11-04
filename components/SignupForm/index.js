import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Alert, Switch, Keyboard} from 'react-native';

import {Touch} from 'react-native-kin-ui';

import RadioForm from 'react-native-simple-radio-button';

import {FormInput, TermsModal, Button} from '../../config/components';

import theme from '../../const/theme';
import styles from './styles';

var userRoles = [
  {label: 'Consumidor', value: 0},
  {label: 'Parceiro', value: 1},
];

class SignupForm extends React.Component {
  static propTypes = {
    email: PropTypes.string,
    cpf: PropTypes.string,
    cnpj: PropTypes.string,
    phone: PropTypes.string,
    birthday: PropTypes.string,
    termsAccepted: PropTypes.bool,
    buttonLabel: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    buttonLabel: 'Confirmar',
  };

  state = {
    userRole: 0,
    email: null,
    cpf: null,
    cnpj: null,
    phone: null,
    birthday: null,
    termsAccepted: false,
    termsModalVisibility: false,
  };

  componentDidMount() {
    this.setState({
      email: this.props.email,
      cpf: this.props.cpf,
      cnpj: this.props.cnpj,
      phone: this.props.phone,
      birthday: this.props.birthday,
      termsAccepted: this.props.termsAccepted,
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
   * @name toggleTermsModal
   * @description focus the input
   * @return {Void}
   */
  toggleTermsModal() {
    this.setState({
      termsModalVisibility: !this.state.termsModalVisibility,
    });
  }

  /**
   * @name isFormInvalid
   * @description check form validation
   * @return {Boolean} according to form validation
   */
  get isFormInvalid() {
    let {userRole, email, cpf, cnpj, termsAccepted} = this.state;

    return !(email && cpf && (userRole === 0 ? true : cnpj) && termsAccepted);
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
    let {userRole, email, cpf, cnpj, phone, birthday, termsAccepted} =
      this.state;

    let error = false;

    if (!email) {
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
        email,
        cpf,
        phone,
        birthday,
      };

      let company = null;

      if (userRole === 1) {
        company = {
          cnpj,
        };
      }

      this.props.onSubmit({
        user,
        company,
      });
    }
  }

  render() {
    let {userRole} = this.state;
    let refOnCpfSubmit = userRole === 0 ? 'phone' : 'company';

    return (
      <View style={styles.container}>
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
              iconRightName="envelope"
              autoCapitalize="none"
              value={this.state.email}
              placeholder="Seu e-mail *"
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
              placeholder="Seu CPF *"
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
              placeholder="Telefone"
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
                    <Touch onPress={this.toggleTermsModal.bind(this)}>
                      <Text style={styles.linkText}>Termos de Uso</Text>
                    </Touch>
                  </View>
                </View>
                <TermsModal
                  visible={this.state.termsModalVisibility}
                  onClose={this.toggleTermsModal.bind(this)}
                />
              </View>
            )}
          </View>
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

export default SignupForm;
