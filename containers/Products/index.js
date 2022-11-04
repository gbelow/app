import React from 'react';
import {connect} from 'react-redux';

import {View, Text, FlatList} from 'react-native';

import {
  NoResults,
  NoConnection,
  HeaderButton,
  FormInput,
} from '../../config/components';

import {productDetailRequest} from '../../actions/cavabenActions';

import {Touch} from 'react-native-kin-ui';

import images from '../../const/images';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

class Products extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title,
    headerRight: <View />,
  });

  componentWillMount() {
    this.props.navigation.setParams({
      goBack: this.goBack.bind(this),
    });
  }

  state = {
    groups: null,
    cavaben: null,
    products: null,
    productsSearched: null,
    searchText: '',
    groupTitle: '',
    typeTitle: '',
  };

  goBack() {
    const {groups, products} = this.state;

    if (products) {
      this.setState({
        products: null,
        productsSearched: null,
      });
    } else if (groups) {
      this.setState({
        groups: null,
      });
    } else {
      this.props.navigation.goBack();
    }
  }

  renderUseItem({item}) {
    return (
      <Touch
        onPress={() =>
          this.setState({groups: item.groups, groupTitle: item.description})
        }>
        <View style={styles.itemContainer}>
          <Icon name="caret-right" style={styles.indicatorRight} />
          <Text style={styles.itemText}>{item.description}</Text>
        </View>
      </Touch>
    );
  }

  renderGroupItem({item}) {
    return (
      <Touch
        onPress={() =>
          this.setState({products: item.products, typeTitle: item.description})
        }>
        <View style={styles.itemContainer}>
          <Icon name="caret-right" style={styles.indicatorRight} />
          <Text style={styles.itemText}>{item.description}</Text>
        </View>
      </Touch>
    );
  }

  renderProductItem({item}) {
    return (
      <Touch
        onPress={() => {
          if (item.contentId) {
            this.props.loadProductDetail(item.contentId);
          }
        }}>
        <View style={styles.itemContainer}>
          <Icon name="caret-right" style={styles.indicatorRight} />
          <Text numberOfLines={1} style={styles.itemText}>
            {item.reference} - {item.description}
          </Text>
          {item.contentId && (
            <Icon name="info-circle" style={styles.infoIcon} />
          )}
        </View>
      </Touch>
    );
  }

  searchProducts(searchText) {
    if (searchText.length === 0) {
      this.setState({
        productsSearched: null,
        searchText: '',
      });

      return;
    }

    if (this.props.products.data) {
      const products = this.props.products.data.filter((product) => {
        let search = searchText
          .replace(/[.]/g, '')
          .replace(/[ç]/g, 'c')
          .toLowerCase();

        return product.searchText.includes(search);
      });

      this.setState({
        searchText,
        productsSearched: products,
      });
    }
  }

  render() {
    const {cavaben} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <FormInput
            ref="search"
            iconRightName="search"
            returnKeyType="done"
            placeholder="Pesquisar entre todos os produtos"
            value={this.state.searchText}
            onChangeText={(searchText) => this.searchProducts(searchText)}
          />
        </View>
        {!this.state.groups &&
          !this.state.products &&
          !this.state.productsSearched && (
            <View>
              <Text style={styles.title}>Escolha uma categoria:</Text>
              <FlatList
                data={cavaben.data}
                renderItem={this.renderUseItem.bind(this)}
                keyExtractor={(item, index) => index}
                ListEmptyComponent={() => {
                  if (cavaben.data && cavaben.data.length === 0) {
                    return (
                      <NoResults
                        image={images.products}
                        text="Não há registros"
                      />
                    );
                  } else if (!this.props.connection) {
                    return <NoConnection />;
                  }
                  return null;
                }}
              />
            </View>
          )}
        {this.state.groups &&
          !this.state.products &&
          !this.state.productsSearched && (
            <View style={styles.productsContainer}>
              <Text style={styles.title}>
                Escolha o tipo de produto para {this.state.groupTitle}:
              </Text>
              <FlatList
                data={this.state.groups}
                renderItem={this.renderGroupItem.bind(this)}
                keyExtractor={(item, index) => index}
                ListEmptyComponent={() => {
                  if (this.state.groups && this.state.groups.length === 0) {
                    return (
                      <NoResults
                        image={images.products}
                        text="Não há registros"
                      />
                    );
                  } else if (!this.props.connection) {
                    return <NoConnection />;
                  }
                  return null;
                }}
              />
              <View style={styles.backContainer}>
                <Touch onPress={() => this.goBack()}>
                  <Text style={styles.backText}>Voltar</Text>
                </Touch>
              </View>
            </View>
          )}
        {this.state.products && !this.state.productsSearched && (
          <View style={styles.productsContainer}>
            <Text style={styles.title}>
              Listando produtos do tipo {this.state.typeTitle}
            </Text>
            <FlatList
              data={this.state.products}
              renderItem={this.renderProductItem.bind(this)}
              keyExtractor={(item, index) => index}
              ListEmptyComponent={() => {
                if (this.state.products && this.state.products.length === 0) {
                  return (
                    <NoResults
                      image={images.products}
                      text="Não há registros"
                    />
                  );
                } else if (!this.props.connection) {
                  return <NoConnection />;
                }
                return null;
              }}
            />
            <View style={styles.backContainer}>
              <Touch onPress={() => this.goBack()}>
                <Text style={styles.backText}>Voltar</Text>
              </Touch>
            </View>
          </View>
        )}
        {this.state.productsSearched && (
          <View>
            <Text style={styles.title}>
              Listando produtos na busca por {this.state.searchText}:
            </Text>
            <FlatList
              data={this.state.productsSearched}
              renderItem={this.renderProductItem.bind(this)}
              keyExtractor={(item, index) => index}
              ListEmptyComponent={() => {
                if (
                  this.state.productsSearched &&
                  this.state.productsSearched === 0
                ) {
                  return (
                    <NoResults
                      image={images.products}
                      text="Não há registros"
                    />
                  );
                } else if (!this.props.connection) {
                  return <NoConnection />;
                }
                return null;
              }}
            />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({cavaben, connection, products}) => ({
  cavaben,
  products,
  connection,
});

const mapDispatchToProps = (dispatch) => ({
  loadProductDetail: (contentId) => {
    dispatch(productDetailRequest(contentId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
