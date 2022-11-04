import React from 'react';
import {connect} from 'react-redux';

import {View, Keyboard, KeyboardAvoidingView, Alert} from 'react-native';

import Permissions from 'react-native-permissions';
import {
  DevolutionForm,
  SearchCustomerModal,
  HeaderButton,
} from '../../config/components';

import {devolutionSincronizeRequest} from '../../actions/devolutionActions';

import {navigate} from '../../actions/navigateActions';
import {
  customersRequest,
  resetSaleCustomer,
} from '../../actions/customerActions';

import styles from './styles';

class Devolutions extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title,
    headerRight: (
      <HeaderButton
        label="Enviar"
        labelStyle={styles.headerButtonText}
        onPress={() => {
          if (navigation.state.params && navigation.state.params.onSubmit) {
            navigation.state.params.onSubmit();
          }
        }}
      />
    ),
  });

  state = {
    barcode: '',
    showSearchModal: false,
    informCustomer: true,
    customerId: null,
    customerName: null,
    saleItems: [],
  };

  componentDidMount() {
    this.props.navigation.setParams({
      onSubmit: this.handleSubmit.bind(this),
    });

    if (!this.props.customers.data) {
      const {user} = this.props.session.data;
      this.props.loadCustomers();
    }
  }

  componentWillUnmount() {
    this.props.resetSaleCustomer();
  }

  /**
   * @name openCamera
   * @description open barcode camera
   * @returns {Void}
   */
  openCamera() {
    Permissions.request('camera').then((response) => {
      this.props.navigate({
        routeName: 'BarcodeCamera',
        params: {
          onBarRead: this.handleBarCodeRead.bind(this),
          permission: response,
        },
      });
    });
  }

  /**
   * @name handleBarCodeRead
   * @description callback when user reads code from camera
   * @param {String} barcode read
   * @returns {Void}
   */
  handleBarCodeRead(barcode) {
    this.handleSaveItem({
      tag: barcode,
    });
  }

  /**
   * @name handleChangeCode
   * @description callback when user changes code
   * @returns {Void}
   */
  handleChangeCode() {
    this.setState({barcode: ''});
  }

  handleChangeInformCustomer(informCustomer) {
    this.setState({informCustomer});
  }

  /**
   * @name customerId
   * @description get customerId
   * @returns {Void}
   */
  get customerName() {
    const {customerSale} = this.props;

    if (this.state.customerName) {
      return this.state.customerName;
    } else if (customerSale && customerSale.data) {
      return customerSale.data.name;
    }
    return null;
  }

  /**
   * @name handleNewCustomer
   * @description callback when create new customer
   * @returns {Void}
   */
  handleNewCustomer() {
    this.props.navigate({
      routeName: 'NewCustomer',
      params: {
        from: 'Devolutions',
      },
    });

    this.setState({customerName: null});
    this.toggleSearchModal();
  }

  /**
   * @name handleCustomerSelection
   * @description callback when select customer on SearchCustomerModal
   * @param {Object} customer
   * @returns {Void}
   */
  handleCustomerSelection(customer) {
    this.setState({
      customerId: customer.customerId,
      customerName: customer.name,
    });

    this.toggleSearchModal();
  }

  /**
   * @name toggleSearchModal
   * @description controls search customer modal visibility
   * @returns {Void}
   */
  toggleSearchModal() {
    Keyboard.dismiss();

    this.setState({
      showSearchModal: !this.state.showSearchModal,
    });
  }

  /**
   * @name handleSaveItem
   * @description callback when create new item
   * @returns {Void}
   */
  handleSaveItem(item) {
    let error = null;

    this.state.saleItems.map((sale) => {
      if (sale.tag === item.tag) {
        error = 'Tag já cadastrada';
      }
    });

    if (error) {
      Alert.alert('Atenção', error, [{text: 'OK'}]);
    } else {
      const {saleItems} = this.state;

      saleItems.push(item);
      this.setState({saleItems});
    }
  }

  /**
   * @name handleDeleteItem
   * @description callback when deles a sale item
   * @param {Object} sale item
   * @returns {Void}
   */
  handleDeleteItem(item) {
    const saleItems = [];

    this.state.saleItems.map((sale) => {
      if (sale.tag !== item.tag) {
        saleItems.push(sale);
      }
    });

    this.setState({saleItems});
  }

  /**
   * @name handleSubmit
   * @description callback when user sends data from form
   * @param {Object} sale data
   * @returns {Void}
   */
  handleSubmit() {
    Keyboard.dismiss();

    if (this.state.informCustomer && !this.customerName) {
      Alert.alert('Atenção', 'Informe o cliente.', [{text: 'OK'}]);
    } else if (this.state.saleItems.length) {
      this.props.sincronize({
        items: this.state.saleItems,
        customerId: this.state.informCustomer && this.state.customerId,
        date: this.getDate(),
      });

      this.props.resetSaleCustomer();
    } else {
      Alert.alert('Atenção', 'Adicione itens antes de salvar.', [{text: 'OK'}]);
    }
  }

  /**
   * @name getDate
   * @description return current date in right format
   * @return {string} formatted date
   * */
  getDate = () => {
    const date = new Date();

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString();
    const formatedMonth = month.length === 1 ? `0${month}` : month;
    const day = date.getDate().toString();
    const formatedDay = day.length === 1 ? `0${day}` : day;
    const hour = date.getHours().toString();
    const formatedHour = hour.length === 1 ? `0${hour}` : hour;
    const minute = date.getMinutes().toString();
    const formatedMinute = minute.length === 1 ? `0${minute}` : minute;
    const second = date.getSeconds().toString();
    const formatedSecond = second.length === 1 ? `0${second}` : second;

    return `${formatedDay}/${formatedMonth}/${year} ${formatedHour}:${formatedMinute}:${formatedSecond}`;
  };

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={-200}
          style={styles.keyboardContainer}>
          <DevolutionForm
            barcode={this.state.barcode}
            customerId={this.customerName}
            onChangeCode={this.handleChangeCode.bind(this)}
            onChangeInformCustomer={this.handleChangeInformCustomer.bind(this)}
            onRequestToOpenCamera={this.openCamera.bind(this)}
            onRequestToOpenCustomersModal={this.toggleSearchModal.bind(this)}
            saleItems={this.state.saleItems}
            onSaveItem={this.handleSaveItem.bind(this)}
            onDeleteItem={this.handleDeleteItem.bind(this)}
            onSubmit={this.handleSubmit.bind(this)}
          />
          {this.state.showSearchModal && (
            <SearchCustomerModal
              visible={this.state.showSearchModal}
              customers={this.props.customers.data}
              connection={this.props.connection}
              onRequestToCreateNewCustomer={this.handleNewCustomer.bind(this)}
              onSelect={this.handleCustomerSelection.bind(this)}
              onClose={this.toggleSearchModal.bind(this)}
            />
          )}
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = ({session, customers, customerSale, connection}) => ({
  session,
  customers,
  customerSale,
  connection,
});

const mapDispatchToProps = (dispatch) => ({
  loadCustomers: () => {
    dispatch(customersRequest());
  },
  sincronize: (data) => {
    dispatch(devolutionSincronizeRequest(data));
  },
  resetSaleCustomer: () => {
    dispatch(resetSaleCustomer());
  },
  navigate: (data) => {
    dispatch(navigate(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Devolutions);
