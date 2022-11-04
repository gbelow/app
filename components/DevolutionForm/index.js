import React from 'react';
import PropTypes from 'prop-types';
import {View, Keyboard, FlatList} from 'react-native';

import {Touch} from 'react-native-kin-ui';

import {Button, SaleItem, FormInput} from '../../config/components';

import theme from '../../const/theme';
import styles from './styles';

class DevolutionForm extends React.Component {
  static propTypes = {
    onSaveItem: PropTypes.func.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
    saleItems: PropTypes.array,
    customerId: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    onRequestToOpenCamera: PropTypes.func.isRequired,
    onRequestToOpenCustomersModal: PropTypes.func.isRequired,
    onChangeCode: PropTypes.func.isRequired,
    barcode: PropTypes.string,
  };

  state = {
    tag: null,
    customer: null,
  };

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
  renderSaleItem({item}) {
    return (
      <SaleItem tag={item.tag} onDelete={this.deleteItem.bind(this, item)} />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
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
          <Button
            label="Adicionar item"
            onPress={this.saveItem.bind(this)}
            disabled={!this.formIsValid}
            uppercase={true}
            backgroundColor="#CCC"
            color={theme.white}
          />
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

export default DevolutionForm;
