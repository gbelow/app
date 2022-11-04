import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Modal, FlatList} from 'react-native';

import {Touch} from 'react-native-kin-ui';

import {
  SearchCustomerItem,
  NavigationBar,
  NoResults,
  NoConnection,
  FormInput,
} from '../../config/components';

import images from '../../const/images';
import styles from './styles';

class SearchCustomerModal extends React.Component {
  static propTypes = {
    customers: PropTypes.array,
    onClose: PropTypes.func.isRequired,
    onRequestToCreateNewCustomer: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    connection: PropTypes.bool,
  };

  state = {
    searchText: '',
    customers: this.props.customers,
  };

  searchCustomer(searchText) {
    const text = searchText.toLowerCase();

    const customers = this.props.customers.filter((item) => {
      const customer = item.name.toLowerCase();
      return customer.includes(text);
    });

    this.setState({
      searchText,
      customers,
    });
  }

  renderNoResultText() {
    if (this.state.searchText && this.state.searchText.length) {
      return 'Nenhum cliente encontrado';
    }
    return 'Você ainda não cadastrou nenhum cliente';
  }

  renderItem({item}) {
    return (
      <Touch
        onPress={() => {
          this.props.onSelect(item);
        }}>
        <SearchCustomerItem
          name={item.name}
          phone={item.phone}
          email={item.email}
        />
      </Touch>
    );
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={this.props.onClose}>
        <View style={styles.inner}>
          <NavigationBar
            left={
              <Touch onPress={this.props.onClose}>
                <View style={styles.cancelButton}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.cancelText}>
                    Voltar
                  </Text>
                </View>
              </Touch>
            }
            title="Pesquisar cliente"
            right={
              <Touch onPress={this.props.onRequestToCreateNewCustomer}>
                <View style={styles.createButton}>
                  <Text style={styles.createText}>Novo</Text>
                </View>
              </Touch>
            }
          />
          <View style={styles.inputContainer}>
            <FormInput
              ref="search"
              returnKeyType="done"
              iconRightName="search"
              placeholder="Buscar cliente"
              value={this.state.searchText}
              onChangeText={(searchText) => this.searchCustomer(searchText)}
            />
          </View>
          <FlatList
            data={this.state.customers}
            extraData={this.state}
            keyExtractor={(item) => item.customerId}
            renderItem={this.renderItem.bind(this)}
            ListEmptyComponent={() => {
              if (this.state.customers && this.state.customers.length === 0) {
                return (
                  <NoResults
                    image={images.customers}
                    text={this.renderNoResultText()}
                  />
                );
              } else if (!this.props.connection) {
                return <NoConnection />;
              }

              return null;
            }}
          />
        </View>
      </Modal>
    );
  }
}

export default SearchCustomerModal;
