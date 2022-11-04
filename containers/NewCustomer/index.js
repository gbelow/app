import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';

import {Button, FormInput} from '../../config/components';

import {
  customerCreateRequest,
  customerUpdateRequest,
  customerSaleCreateRequest,
} from '../../actions/customerActions';

import styles from './styles';

class NewCustomer extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title:
      navigation.state.params && navigation.state.params.action === 'edit'
        ? 'Editar cliente'
        : 'Novo cliente',
    headerRight: <View />,
  });

  state = {
    id: null,
    name: null,
    phone: null,
    email: null,
    birthday: null,
    cpf: null,
  };

  componentDidMount() {
    const {params} = this.props.navigation.state;

    if (params && params.action === 'edit') {
      this.setState({
        id: params.id,
        name: params.name,
        phone: params.phone,
        email: params.email,
        birthday: params.birthday,
        cpf: params.cpf,
      });
    }
  }

  /**
   * @name focusOn
   * @description callback when user submits a field
   * @param {String} key ref
   * @return {Void}
   * */
  focusOn(key) {
    this.refs[key].focus();
  }

  /**
   * @name submit
   * @description submit form
   * @return {Void}
   * */
  submit() {
    let {name, email, phone, birthday, cpf} = this.state;

    let error = false;

    if (name) {
      if (email || phone) {
        if (email && (!email.includes('@') || !email.includes('.'))) {
          error = 'Email inválido.';
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
        } else if (
          cpf &&
          cpf.length &&
          cpf.replace(/[^0-9]/g, '').length < 11
        ) {
          error = 'CPF inválido!';
        }
      } else {
        error =
          'Você deve informar junto ao nome do cliente, pelo menos e-mail ou telefone.';
      }
    } else {
      error = 'Informe o nome do cliente.';
    }

    if (error) {
      Alert.alert('Atenção', error, [
        {
          text: 'Entendi',
        },
      ]);
    } else {
      const {params} = this.props.navigation.state;
      let customerId = this.props.customers.meta.lastCustomerId + 1;

      if (params && params.action === 'edit') {
        customerId = params.id;
      }

      const customer = {
        customerId,
        name,
        email,
        cpf,
        birthday,
        phone,
      };

      if (params && params.action === 'edit') {
        this.props.update(customer);
      } else if (params && params.from === 'NewSale') {
        this.props.createSaleCustomer(customer);
      } else {
        this.props.create(customer);
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : -150}
          style={styles.keyboardContainer}>
          <View style={styles.inner}>
            <View>
              <FormInput
                ref="name"
                placeholder="Nome"
                returnKeyType="next"
                autoCapitalize="words"
                value={this.state.name}
                iconRightName="user"
                onChangeText={(name) => this.setState({name})}
                onSubmitEditing={this.focusOn.bind(this, 'email')}
              />
              <FormInput
                ref="email"
                placeholder="E-mail"
                returnKeyType="next"
                keyboardType="email-address"
                autoCapitalize="none"
                value={this.state.email}
                iconRightName="envelope"
                onChangeText={(email) => this.setState({email})}
                onSubmitEditing={this.focusOn.bind(this, 'phone')}
              />
              <FormInput
                ref="phone"
                placeholder="Telefone"
                returnKeyType="done"
                mask="(00)0000-00000"
                maxLength={14}
                keyboardType="phone-pad"
                value={this.state.phone}
                iconRightName="phone-square"
                onChangeText={(phone) => this.setState({phone})}
                onSubmitEditing={this.focusOn.bind(this, 'birthday')}
              />
              <FormInput
                ref="birthday"
                placeholder="Nascimento (não obrigatório)"
                returnKeyType="next"
                mask="00/00/0000"
                maxLength={10}
                keyboardType="numeric"
                value={this.state.birthday}
                iconRightName="birthday-cake"
                onChangeText={(birthday) => this.setState({birthday})}
                onSubmitEditing={this.focusOn.bind(this, 'cpf')}
              />
              <FormInput
                ref="cpf"
                placeholder="CPF (não obrigatório)"
                returnKeyType="next"
                mask="000.000.000-00"
                keyboardType="numeric"
                maxLength={14}
                value={this.state.cpf}
                iconRightName="id-card"
                onChangeText={(cpf) => this.setState({cpf})}
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                }}
              />
            </View>
            <View>
              <Button label="Salvar cliente" onPress={this.submit.bind(this)} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = ({session, customers}) => ({
  session,
  customers,
});

const mapDispatchToProps = (dispatch) => ({
  create(customer) {
    dispatch(customerCreateRequest(customer));
  },
  update(customer) {
    dispatch(customerUpdateRequest(customer));
  },
  createSaleCustomer(customer) {
    dispatch(customerSaleCreateRequest(customer));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewCustomer);
