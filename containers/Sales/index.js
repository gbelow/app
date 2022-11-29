import React from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  Image,
  FlatList,
  Touchable,
  Alert,
} from "react-native";

import {
  HeaderButton,
  FormInput,
  Button,
} from "../../config/components";

import { getBasket, get, deleteCart, getCartList } from "../../services/colcciCustomerApi";

import { Touch } from "react-native-kin-ui";
import { name, appId, mode } from "../../package.json";
import theme from "../../const/theme";
import Icon from "react-native-vector-icons/FontAwesome";
import images from "../../const/images";
import styles from "./styles";
import watchNavigateSaga from "../../sagas/navigateSaga";

class Sales extends React.Component {
  static navigationOptions = ({ navigation }) => ({    
    title: navigation.state.params.title,
    tabBarLabel: "Vendas",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="shopping-basket" color={tintColor} size={16} />
    ),
    headerRight: (
      <HeaderButton
        icon="plus"
        iconStyle={styles.headerIconStyle}
        style={styles.headerButtonStyle}
        label="Novo"
        navigation={navigation}
        routeName="ChooseCustomer"
      />
    ),
  });

  state = {
    searchText: "",
    carts: [],
  };

  /**
   * @name afterLoginWithError
   * @description callback after facebook logged with error
   * @return {Object} result
   * @return {Void}
   */

  async componentDidMount(){
    const  cartsList = await getCartList('colcci-guilherme.below@adapcon.com.br')
    this.setState({carts: cartsList.data})
  }

  searchCustomers(searchText) {
    if (searchText.length === 0) {
      this.setState({
        customersSearched: [],
        searchText: null,
      });

      return;
    };    

    if (this.props.customers.data) {
      const customers = this.props.customers.data.filter((customer) => {
        let search = searchText.replace(/[ç]/g, "c").toLowerCase();

        return customer.name
          .replace(/[ç]/g, "c")
          .toLowerCase()
          .includes(search);
      });

      this.setState({
        searchText,
        customersSearched: customers,
      });
    }
  }

  

  async handleDeleteCart(cartId){
    await deleteCart(cartId)
  }

  renderCartList(cart) {
    const {Email, BasketStatus, itens} = cart.item

    const handleBuyButtonClick = async () => {
      this.props.navigation.navigate("NewCart", {cart: cart.item})
    }
    const handleCartFinishClick = async () => {
      this.props.navigation.navigate("CartDetails", {cart: cart.item})
    }

    const handleCartDeleteClick = async () => {
      Alert.alert('Alertado', 'alert', [        
          {
            text: "Cancel",
            onPress: () => null,
          },
          { text: "OK", onPress: () => deleteCart(cart.item.id) }        
          // { text: "OK", onPress: deleteCart(cart.item.) }        
      ])
    }
    
    return (
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            paddingVertical: 5,
            backgroundColor: 'white',
            justifyContent: "space-between",
            marginVertical: 10,
            paddingHorizontal: 5,
            borderRadius: 5,
            height: 100,
          }}
        >
          <View>
            <Text style={{ color: `gray`, fontWeight: 'bold' }}>{Email}</Text>
            <Text style={{ color: `green`, fontWeight: 'bold', fontSize: 20 }}>R$ {itens?.reduce((acc, el) => parseFloat(el.BasketPrice) + acc, 0)}</Text>
            <Text style={{ color: BasketStatus === 'open' ? `green` : 'red' }}>{BasketStatus}</Text>
          </View>
          <View>
            <Touch onPress={handleBuyButtonClick.bind(this)} >
              <Text style={{  borderRadius: 5, backgroundColor: '#F9C600', textAlign: 'center', padding: 3, borderWidth: 1, marginVertical: 2 }}>Comprar</Text>
            </Touch>
            <Touch onPress={handleCartFinishClick.bind(this)}>
              <Text style={{borderRadius: 5, backgroundColor: '#F9C600', textAlign: 'center', padding: 3, borderWidth: 1, marginVertical: 2 }}>Ir para Carrinho</Text>
            </Touch>
            <Touch onPress={handleCartDeleteClick.bind(this)}>
              <Text style={{borderRadius: 5, backgroundColor: '#F9C600', textAlign: 'center', padding: 3, borderWidth: 1 , marginVertical: 2}}>Excluir</Text>
            </Touch>
          </View>
        </View>        
    );
  };


  render() {
    return (
      <View style={styles.container}>
        <View style={{  width: "80%" }}>
          {/* <FormInput
            ref="searchCustomer"
            iconRightName="search"
            returnKeyType="done"
            placeholder="Pesquisar carrinho"
            value={this.state.searchText}
            onChangeText={(searchText) => this.searchCustomers(searchText)}
          />         */}
          
        </View>
        <View style={{justifyContent: 'center', width: '80%', height:'75%'}}>
        <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center', paddingVertical: 4, fontSize: 20}}>Seus Carrinhos</Text>
            
            <FlatList
              data={this.state.carts}
              renderItem={this.renderCartList.bind(this)}
              keyExtractor={(item, index) => index}              
              scrollEnabled={true}
              numColumns={1}
              />

        </View>
      </View>
      // <CustomerOrder />
      // <OrderEditor />
    );
  }
}

// const mapStateToProps = ({ }) => ({});

// const mapDispatchToProps = () => ({})

// export default connect(mapStateToProps, mapDispatchToProps)(Sales);
export default Sales;
