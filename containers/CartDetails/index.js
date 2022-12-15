import React from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  Image,
  FlatList,
  Alert,
  Modal
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
import { checkoutRedirect, getCart, deleteCartItem, deleteItemFromBasket, getShippingValue} from '../../services/colcciCustomerApi'

import  {showMessage, hideMessage } from 'react-native-flash-message'

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
    cartId: this.props.navigation.state.params.cart.CartID,
    cart: {},
    fretes:[],
    CEPModalVisible: false,
    modalImage: {},
  };

  /**
   * @name afterLoginWithError
   * @description callback after facebook logged with error
   * @return {Object} result
   * @return {Void}
   */

  async componentDidMount(){ 
    await this.updateCart()
    await this.calculateShipping()
  }

  async calculateShipping() {
    const shipping = await getShippingValue({
      BasketID: this.state.cart.BasketID, 
      PostalCode: this.state.searchText.length > 0 ? this.state.searchText : this.state.cart.PostalCode
    })
    if(shipping){
      const deliveryOptions = shipping.data.Shopper.Basket.DeliveryGroups[0].DeliveryOptions
      const fretes = deliveryOptions.map(el => ({name: el.Name, preco: el.Amount, deliveryEstimatedDate: el.DeliveryEstimatedDate, estimatedTime: el.EstimatedTime}))
      this.setState({fretes})
    }
  }
  
  async updateCart() {
    const  cart = await getCart(this.state.cartId)    
    this.setState({cart: cart.data[0]})
  }

  async handleFinish(){
    try{
      const resp = await checkoutRedirect('1757815', 'qyiaqgeidhdy3xnhadfnmx3u', '467973')
      return resp
    }catch(err){
      console.log(err)
    }
  }

  async handleDeleteClick(product){
    
    const {BasketItemID, CartItemID} = product.item
    const {BasketID, CustomerID, SessionID, ShopperTicketID, CartName, CustomerName} = this.state.cart

    const params = {
      BasketID,
      SessionID,
      ShopperTicketID,
      CustomerID,
      BasketItemID
  }

  const deleteItem = async () => {
    let resp = null
    if(this.state.cart.CustomerID){
      resp = deleteItemFromBasket(params)

      if(!resp){
        showMessage({
          message: `Não foi possivel excluir o item da links!`,
          // description: "This is our second message",
          type: "warning",
          duration: 1000,
        });
        return
      }
    }
    
    const resp2 = deleteCartItem(CartItemID)
    if(resp2){
      showMessage({
        message: ` Removido!`,
        // description: "This is our second message",
        type: "success",
        duration: 1000,
      });
      this.updateCart()
      return
    }

    showMessage({
      message: `Falhou!`,
      // description: "This is our second message",
      type: "warning",
      duration: 1000,
    });
  }
  
    Alert.alert('Excluir Item', 'Deseja mesmo excluir o item do carrinho?', [        
        {
          text: "Não",
          onPress: () => null,
        },
        { text: "Sim", onPress: deleteItem }        
    ])
  }

  async handleDeliveryCalculateClick() {
    if(/^[0-9]+$/.test(this.state.searchText )){
      const shipping = await getShippingValue({BasketID: this.state.cart.BasketID, PostalCode: this.state.searchText})
      const deliveryOptions = shipping.data.Shopper.Basket.DeliveryGroups[0].DeliveryOptions
      const fretes = deliveryOptions.map(el => ({name: el.Name, preco: el.Amount, deliveryEstimatedDate: el.DeliveryEstimatedDate, estimatedTime: el.EstimatedTime}))
    }
  }

  handleImageClick(image) {
    return(
      () => {
        console.log(image)
        this.setState({modalImage: image})

      }
    )
  }

  renderProductsItem(product) {
    const {  ProductName, BasketPrice, Quantity, URLimagens, ProductSize, ProductColor } = product.item;
    
    return (
      <View
        style={{
          width: "80%",
          flexDirection: "row",
          paddingVertical: 5,
          justifyContent: "space-between",
        }}
      >
        <Touch onPress={this.handleImageClick(product.item).bind(this)} >
          <Image
            source={{
              uri: URLimagens[0],
            }}
            style={styles.image}
          />
        </Touch>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '80%'}}>
          <View style={{marginLeft: 5, width: '80%'}}>
            <Text style={{ color: `white`, fontWeight: 'bold', fontSize: 16 }}>{ProductName} </Text>
            <Text style={{ color: `green`, fontWeight: 'bold', fontSize: 16 }}> R$ {BasketPrice}</Text>
            <Text style={{ color: `white`, fontWeight: 'bold', fontSize: 16 }}>Qtd: {Quantity}</Text>
            <Text style={{ color: `white`, fontWeight: 'bold', fontSize: 16 }}>Tamanho: {ProductSize}</Text>
            <Text style={{ color: `white`, fontWeight: 'bold', fontSize: 16 }}>Cor: {ProductColor}</Text>
          </View>
          <View style={{ width: '20%'}}>
            <Touch onPress={(() => this.handleDeleteClick(product)).bind(this)}>
              <Icon name="trash" color={'#F00'}  size={24}  />
            </Touch>
          </View>
        </View>
      </View>
    );
  }

  setCEPModalVisible(arg) {
    return(() => {
      this.setState({CEPModalVisible: arg})
    })
  }

  render() {
    const {CustomerName, BasketID, PostalCode, Items, CartName} = this.state.cart
    // console.log(this.state.cart, 'cartolinha')
    return (
      <View style={styles.container}>
        <View style={{  width: "90%", height: '10%' }}>
          <View style={{ paddingVertical: 10,  justifyContent: 'space-between' }}>
            <Text style={{ color: "white", fontWeight: 'bold', fontSize: 16 }}> {CartName}</Text>
            <Text style={{ color: "white", fontWeight: 'bold', fontSize: 16 }}>{CustomerName}</Text>
          </View>
        </View> 
        <View>          
          <View style={{ width: '90%', height: '85%', paddingVertical: 10}}>
            <FlatList
              data={Items}
              renderItem={this.renderProductsItem.bind(this)}
              keyExtractor={(item, index) => index}
              numColumns={1}
            />
          </View>
        </View>
        
        <View style={{position:'absolute', left: 0, right: 0, bottom: 5,}}>
          <Touch onPress={this.setCEPModalVisible(true).bind(this)}>
            <View style={{borderRadius: 5, backgroundColor: "#F9C600", alignSelf: 'flex-start', padding: 5, marginLeft: 10}}>
                <Text style={{fontSize: 16, color: '#000'}}>CEP para entrega: {PostalCode}</Text>
            </View>
          </Touch>
          <Text style={{color: 'white', fontSize: 20, marginLeft: 15, marginBottom: 5}}>Preço total: R$ {formatCurrency( Items?.reduce((acc, el) => parseFloat(el.BasketPrice) + acc, 0) ?? 0 )}            
          </Text>
          <Button label="Finalizar" onPress={this.handleFinish} />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.CEPModalVisible}
          onRequestClose={() => {
            this.setCEPModalVisible(false).bind(this);
          }}
        >          
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{width: '100%',  marginVertical: 10, alignSelf: 'flex-end'}}>
                <Touch onPress={this.setCEPModalVisible(false).bind(this)}>
                  <Icon name="times" color={'#fff'} size={20}  />
                </Touch>
              </View>
              <FormInput
                iconRightName="search"
                returnKeyType="done"
                placeholder="Escolher outro CEP para envio"
                value={this.state.searchText }
                onChangeText={(searchText) => this.setState({searchText: searchText})}
                onIconRightPress={this.handleDeliveryCalculateClick.bind(this) }
              />
              <FlatList 
                data={this.state.fretes}
                renderItem={({item}) => <Text style={{color: 'white', fontSize: 16, margin: 3}}> {item.name}: R$ {item.preco}. Prazo de enrega: {item.estimatedTime}</Text>}
                keyExtractor={(item, index) => index}
                numColumns={1}
              />
              <Touch onPress={this.calculateShipping.bind(this)}>
                <View style={{borderRadius: 5, backgroundColor: "#F9C600", alignSelf: 'flex-end', padding: 5, marginLeft: 10}}>
                    <Text style={{fontSize: 16, color: '#000'}}>Calcular Fretes</Text>
                </View>
              </Touch>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={Object.keys(this.state.modalImage).length > 0}
          onRequestClose={() => {
            this.setState({modalImage: {} });
          }}
        >    
        {
          Object.keys(this.state.modalImage).length > 0 ? 
            <View style={styles.modalView}>
              <Touch onPress={() => this.setState({modalImage: {} })}  >
                <Text style={{color:'#fff', marginVertical: 5, fontWeight: 'bold', fontSize: 16}}>
                  {this.state.modalImage.ProductName}
                </Text>
                <Image
                  source={{
                    uri: this.state.modalImage.URLimagens[0],
                  }}
                  style={{width: 300, height: 400, margin: 0, borderRadius: 5, borderWidth: 2}}
                  />
                  <Text style={{color:'#fff', marginVertical: 5, fontWeight: 'bold', fontSize: 16}}>
                    Quantidade: {this.state.modalImage.Quantity}
                  </Text>
                  <Text style={{color:'#fff', marginVertical: 5, fontWeight: 'bold', fontSize: 16}}>
                    Tamanho: {this.state.modalImage.ProductSize}
                  </Text>
                  <Text style={{color:'#fff', marginVertical: 5, fontWeight: 'bold', fontSize: 16}}>
                    Cor: {this.state.modalImage.ProductColor}
                  </Text>
                  <Text style={{color:'#fff', marginVertical: 5, fontWeight: 'bold', fontSize: 16}}>
                    Preço: {this.state.modalImage.BasketPrice}
                </Text>
              </Touch>
            </View>
          :
          ''
        }
        </Modal>
      </View>
    );
  }
}

function formatCurrency(num){
  let str = num.toString()
  let [p1, p2] = str.split('.')
  p2 = p2 ? p2.slice(0, 2) : '00'
  p2 = p2.length < 2 ? p2 + '0' : p2
  return p1 + ',' + p2
}


const mapStateToProps = ({ session,}) => ({
  session,
});
// const mapDispatchToProps = () => ({})

export default connect(mapStateToProps)(CartDetails);
