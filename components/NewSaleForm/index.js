import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Keyboard, Switch, FlatList} from 'react-native';

import {Touch} from 'react-native-kin-ui';

import {Button, SaleItem, FormInput} from '../../config/components';

import theme from '../../const/theme';
import styles from './styles';

class NewSaleForm extends React.Component {
  static propTypes = {
    customerId: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    onRequestToOpenCamera: PropTypes.func.isRequired,
    onRequestToOpenCustomersModal: PropTypes.func.isRequired,
    onChangeCode: PropTypes.func.isRequired,
    barcode: PropTypes.string,
    onChangeInformCustomer: PropTypes.func,
    onSaveItem: PropTypes.func.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
    saleItems: PropTypes.array.isRequired,
  };

  state = {
    tag: null,
    customer: null,
    informCustomer: true,
  };

  onChangeInformCustomer(informCustomer) {
    this.setState({informCustomer});

    if (this.props.onChangeInformCustomer) {
      this.props.onChangeInformCustomer(informCustomer);
    }
  }

  /**
   * @name onChangeCode
   * @description callback when user updtes code
   * @return {Void}
   * */
  onChangeCode(tag) {
    this.setState({tag});

    if (this.props.onChangeCode) {
      this.props.onChangeCode();
    }
  }

  /**
   * @name formIsValid
   * @description indicate if form is valid
   * @return {Boolean}
   * */
  get formIsValid() {
    return this.state.tag || this.props.barcode;
  }

  /**
   * @name saveItem
   * @description Save sale item
   * @return {Void}
   * */
  saveItem() {
    Keyboard.dismiss(this);

    this.props.onSaveItem({
      tag: this.state.tag || this.props.barcode,
    });

    this.props.onChangeCode();
    this.setState({tag: ''});
  }

  /**
   * @name deleteItem
   * @description delete sale item
   * @param {object} item
   * @return {Void}
   * */
  deleteItem(item) {
    this.props.onDeleteItem(item);
  }

  /**
   * @name renderSaleItem
   * @description render sale item
   * @returns {Component} SaleItem
   */
  renderSaleItem({item, index}) {
    return (
      <SaleItem
        index={index}
        tag={item.tag}
        onDelete={this.deleteItem.bind(this, item)}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.switchContainer}>
            <Switch
              value={this.state.informCustomer}
              onValueChange={this.onChangeInformCustomer.bind(this)}
            />
            <Text style={styles.switchText}>Informar cliente</Text>
          </View>
          {this.state.informCustomer && (
            <View style={styles.customerInputContainer}>
              <Touch onPress={this.props.onRequestToOpenCustomersModal}>
                <View>
                  <FormInput
                    ref="customerId"
                    returnKeyType="done"
                    iconRightName="user"
                    blurOnSubmit={true}
                    onIconRightPress={this.props.onRequestToOpenCustomersModal}
                    disabled={true}
                    placeholder="Cliente"
                    value={this.props.customerId}
                  />
                </View>
              </Touch>
            </View>
          )}
          <FormInput
            ref="tag"
            returnKeyType="next"
            iconRightName="camera"
            onIconRightPress={this.props.onRequestToOpenCamera}
            placeholder="Código de barras"
            keyboardType="numeric"
            selectTextOnFocus={false}
            value={this.state.tag || this.props.barcode}
            onSubmitEditing={Keyboard.dismiss.bind(this)}
            onChangeText={this.onChangeCode.bind(this)}
          />
          <View style={styles.buttonContainer}>
            <Button
              label="Adicionar item"
              onPress={this.saveItem.bind(this)}
              disabled={!this.formIsValid}
              uppercase={true}
              backgroundColor="#CCC"
              color={theme.white}
            />
          </View>
        </View>
        <View style={styles.saleItems}>
          <FlatList
            data={this.props.saleItems}
            extraData={this.props}
            numColumns={2}
            keyExtractor={(item) => item.tag}
            renderItem={this.renderSaleItem.bind(this)}
            style={styles.saleItemsList}
          />
        </View>
      </View>
    );
  }
}

export default NewSaleForm;
