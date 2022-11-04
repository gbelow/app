import React from 'react';
import {connect} from 'react-redux';

import {View, Keyboard, KeyboardAvoidingView, Alert} from 'react-native';

import Permissions from 'react-native-permissions';
import {
  NewSaleForm,
  SearchCustomerModal,
  SaleTipModal,
  HeaderButton,
} from '../../config/components';

import {saleCreateRequest} from '../../actions/saleActions';

import {navigate} from '../../actions/navigateActions';
import {
  customersRequest,
  resetSaleCustomer,
} from '../../actions/customerActions';

import styles from './styles';

class NewSale extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Nova venda',
    headerRight: (
      <HeaderButton
        label="Salvar"
        icon="save"
        iconStyle={styles.headerIconStyle}
        style={styles.headerButtonStyle}
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
    showTipModal: false,
    informCustomer: true,
    customerId: null,
    customerName: null,
    saleItems: [],
    saveDisabled: false,
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
    this.props.navigation.navigate('NewCustomer', {
      from: 'NewSale',
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
   * @name toggleSearchModal
   * @description controls search customer modal visibility
   * @returns {Void}
   */
  toggleTipModal() {
    Keyboard.dismiss();

    this.setState({
      showTipModal: !this.state.showTipModal,
    });
  }

  /**
   * @name handleSaveItem
   * @description callback when create new item
   * @returns {Void}
   */
  handleSaveItem(item) {
    let error = null;

    if (item.tag && item.tag.length <= 15) {
      //error = 1;
    }

    this.state.saleItems.map((sale) => {
      if (sale.tag === item.tag) {
        error = 2;
      }
    });

    if (error) {
      if (error === 1) {
        this.toggleTipModal();
      } else if (error === 2) {
        Alert.alert('Atenção', 'Tag já cadastrada', [{text: 'OK'}]);
      }
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

    if (!this.state.saveDisabled) {
      if (this.state.informCustomer && !this.customerName) {
        Alert.alert('Atenção', 'Informe o cliente.', [{text: 'OK'}]);
      } else if (this.state.saleItems.length) {
        this.props.create({
          items: this.state.saleItems,
          customerId: this.state.informCustomer && this.state.customerId,
        });

        this.setState({
          saveDisabled: true,
        });
      } else {
        Alert.alert('Atenção', 'Adicione itens a venda antes de salvar.', [
          {text: 'OK'},
        ]);
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={-200}
          style={styles.keyboardContainer}>
          <NewSaleForm
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
          {this.state.showTipModal && (
            <SaleTipModal
              visible={this.state.showTipModal}
              onClose={this.toggleTipModal.bind(this)}
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
  create: (data) => {
    dispatch(saleCreateRequest(data));
  },
  resetSaleCustomer: () => {
    dispatch(resetSaleCustomer());
  },
  navigate: (data) => {
    dispatch(navigate(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewSale);
