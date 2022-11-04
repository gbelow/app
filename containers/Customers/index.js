import React from 'react';
import {connect} from 'react-redux';

import {View, FlatList} from 'react-native';

import {
  CustomerItem,
  NoResults,
  NoConnection,
  HeaderButton,
  FormInput,
} from '../../config/components';

import images from '../../const/images';
import styles from './styles';

class Customers extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title,
    headerRight: (
      <HeaderButton
        label="Novo"
        navigation={navigation}
        routeName="NewCustomer"
      />
    ),
  });

  state = {
    customersSearched: [],
    searchText: null,
  };

  searchCustomers(searchText) {
    if (searchText.length === 0) {
      this.setState({
        customersSearched: [],
        searchText: null,
      });

      return;
    }

    if (this.props.customers.data) {
      const customers = this.props.customers.data.filter((customer) => {
        let search = searchText.replace(/[ç]/g, 'c').toLowerCase();

        return customer.name
          .replace(/[ç]/g, 'c')
          .toLowerCase()
          .includes(search);
      });

      this.setState({
        searchText,
        customersSearched: customers,
      });
    }
  }

  /**
   * @name renderItem
   * @description return item from custumers list
   * @param {Object} item
   * @return {Component} Grid with children
   */
  renderItem = ({item}) => (
    <CustomerItem
      id={item.customerId}
      name={item.name}
      phone={item.phone}
      email={item.email}
      cpf={item.cpf}
      birthday={item.birthday}
      navigation={this.props.navigation}
    />
  );

  render() {
    const {customers} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <FormInput
            ref="search"
            iconRightName="search"
            returnKeyType="done"
            placeholder="Pesquisar cliente"
            value={this.state.searchText}
            onChangeText={(searchText) => this.searchCustomers(searchText)}
          />
        </View>
        {!this.state.searchText && (
          <FlatList
            data={customers && customers.data}
            renderItem={this.renderItem.bind(this)}
            keyExtractor={(item) => item.customerId.toString()}
            style={styles.container}
            ListEmptyComponent={() => {
              if (customers.data && customers.data.length === 0) {
                return (
                  <NoResults
                    image={images.customers}
                    text="Nenhum cliente cadastrado"
                  />
                );
              }
              return null;
            }}
          />
        )}
        {this.state.searchText && (
          <FlatList
            data={this.state.customersSearched}
            renderItem={this.renderItem.bind(this)}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => {
              if (
                this.state.customersSearched &&
                this.state.customersSearched.length === 0
              ) {
                return (
                  <NoResults
                    image={images.customers}
                    text="Nenhum cliente encontrado"
                  />
                );
              }
              return null;
            }}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = ({customers}) => ({
  customers,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Customers);
