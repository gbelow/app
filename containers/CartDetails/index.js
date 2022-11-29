import React from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  Image,
  FlatList,
} from "react-native";

import {
  HeaderButton,
  FormInput,
  Button,
} from "../../config/components";

import { Touch } from "react-native-kin-ui";
import Icon from "react-native-vector-icons/FontAwesome";
import images from "../../const/images";
import styles from "./styles";
import {getBasket, checkoutRedirect, getCart} from '../../services/colcciCustomerApi'

class CartDetails extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Carrinho',
    tabBarLabel: "Carrinho",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="shopping-basket" color={tintColor} size={16} />
    ),
  });

  state = {
    searchText: "",
    basket: {},
    cartID: this.props.navigation.state.params.cart.BasketID,
    cart: {}
  };

  /**
   * @name afterLoginWithError
   * @description callback after facebook logged with error
   * @return {Object} result
   * @return {Void}
   */

  async componentDidMount(){
    const  cart = await getCart(this.state.cartID)
    this.setState({cart: cart.data[0]})
  }

  async handleFinish(){
    try{
      const resp = await checkoutRedirect('1725100', 'ckrbrp4b51vibvlzp4l5foa2', '467973')
      return resp
    }catch(err){
      console.log(err)
    }
  }


  renderProductsItem(product) {
    const {  ProductName, BasketPrice, Quantity, URLimagens } = product.item;
    return (
      <View
        style={{
          width: "80%",
          flexDirection: "row",
          paddingVertical: 5,
          justifyContent: "space-between",
        }}
      >
        <Touch onPress={() => null}>
          <Image
            source={{
              uri: URLimagens[0],
            }}
            style={styles.image}
          />
        </Touch>
        <View>
          <Text style={{ color: `white` }}>{ProductName} </Text>
          <Text style={{ color: `white` }}>Preço: R$ {BasketPrice}</Text>
          <Text style={{ color: `white` }}>Quantidade: {Quantity}</Text>
          <Text style={{ color: `red` }}>Remover</Text>
        </View>
      </View>
    );
  }

  render() {
    const {Email, BasketID} = this.state.cart

    return (
      <View style={styles.container}>
        <View style={{  width: "80%" }}>
          <View style={{ paddingVertical: 10, flexDirection:'row', justifyContent: 'space-between' }}>
            <Text style={{ color: "white" }}>{Email}</Text>
            <Text style={{ color: "white" }}>{BasketID}</Text>
          </View>
        </View> 

        <View>
          
          <Button label="Finalizar" onPress={this.handleFinish} />
          <View style={{ width: '80%', paddingVertical: 10}}>
            <FlatList
              data={this.state.cart.itens}
              renderItem={this.renderProductsItem.bind(this)}
              keyExtractor={(item, index) => index}
              numColumns={1}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default CartDetails;
