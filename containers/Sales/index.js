import React from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  Image,
  FlatList,
  Touchable,
  Alert,
  Modal,
  TextInput,
} from "react-native";

import {
  HeaderButton,
  FormInput,
  Button,
} from "../../config/components";

import { getBasket, get, deleteCart, getCartList, createCart } from "../../services/colcciCustomerApi";

import  {showMessage} from "react-native-flash-message";

import { Touch } from "react-native-kin-ui";
import theme from "../../const/theme";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./styles";

class Sales extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
    tabBarLabel: "Vendas",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="shopping-basket" color={tintColor} size={16} />
    ),
  });

  state = {
    searchText: "",
    carts: [],
    filteredCarts: [],
    modalVisible: false,
    newCartName: '',
    totals: {aberto: 0, total: 0},
    cartToEdit: {}
  };

  /**
   * @name afterLoginWithError
   * @description callback after facebook logged with error
   * @return {Object} result
   * @return {Void}
   */

  handleNewClick() {
    this.setModalVisible(true)
  }

  async componentDidMount(){   
    this.updateCartList()
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.carts !== prevState.carts){
      this.setState({totals: {aberto: this.calculateAllCartTotals('Aberto'), total: this.calculateAllCartTotals()}})
    }
  }

  async updateCartList(){
    // const {userId} = this.props.session.data.user
    const  cartsList = await getCartList({idVendor: 'colcci-guilherme.below@adapcon.com.br', CartName: this.state.searchText})
    
    this.setState({carts: cartsList.data, filteredCarts: cartsList.data })
  } 

  handleSearchCart(searchText) {
    const filteredCarts = this.state.carts.filter(el => 
      el.CartName?.toLowerCase().startsWith(searchText.toLowerCase()) ||
      el.CustomerName?.toLowerCase().startsWith(searchText.toLowerCase()) ||
      el.BasketID?.toString().startsWith(searchText.toLowerCase()) 
    )
    this.setState({searchText: searchText, filteredCarts})

    return;   
  }
  
  setModalVisible (arg) {
    this.setState({modalVisible: arg })
  }

  async handleDeleteCart(cartId){
    const resp = await deleteCart(cartId)

    if(resp){
      showMessage({
        message: `Deletado com sucesso!`,
        // description: "This is our second message",
        type: "success",
        duration: 1000,
      });
    }else{
      showMessage({
        message: `Deu algo de errado!`,
        // description: "This is our second message",
        type: "warning",
        duration: 1000,
      });
    }
    this.setState({carts: this.state.carts.filter(el => el.CartID != cartId), filteredCarts: this.state.filteredCarts.filter(el => el.CartID != cartId)})
  }

  calculateCartTotal(cart) {
    const { Items } = cart
    return Items?.reduce((acc, el) => parseFloat(el.BasketPrice) + acc, 0) ?? 0
  }

  calculateAllCartTotals(filter) {
    let list = this.state.carts

    switch(filter){
      case 'Aberto':
        list = list.filter(el => el.Status === 'Aberto')
        break;
      case 'Finalizado':
        break;
      default:
        break;
        
    }

    return list.reduce((acc,el) => {
      return acc + this.calculateCartTotal(el)
    }, 0)
  }

  renderCartListItem(cart) {
    const {Email, Status, Items, BasketID, CartName, CustomerName, CartID, WebSiteID, IdVendedor} = cart.item

    const handleBuyButtonClick = async () => {
      this.props.navigation.navigate("NewCart", {cart: cart.item})
    }
    const handleCartFinishClick = async () => {
      this.props.navigation.navigate("CartDetails", {cart: cart.item})
    }

    const handleCartDeleteClick = async () => {
      Alert.alert('Excluir Carrinho', 'Deseja mesmo excluir o carrinho?', [        
          {
            text: "Não",
            onPress: () => null,
          },
          { text: "Sim", onPress: async () => await this.handleDeleteCart(CartID) }        
      ])
    }
    const handleCloneCart = async () => {
      const resp = await createCart({CartName, Status: 'Aberto', WebSiteID, IdVendedor, Items: Items.map(el=> ({...el, CartID: null, CartItemID: null})) })
      
      if(resp){
        showMessage({
          message: `Duplicado com sucesso!`,
          // description: "This is our second message",
          type: "success",
          duration: 1000,
        });
      }else{
        showMessage({
          message: `Deu algo de errado!`,
          // description: "This is our second message",
          type: "warning",
          duration: 1000,
        });
      }

      this.updateCartList()
    }

    const handleAddCustomer = () => {
      this.props.navigation.navigate('ChooseCustomer', {cart: cart.item, updateCartList: this.updateCartList.bind(this)})
    }    

    const handleEditCartName = () => {
      this.handleNewClick()
      this.setState({cartToEdit: cart.item})
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
          }}
        >
          <View style={{width: '80%'}}>
            <View style={{flexDirection: 'row', }}>
              <Text style={{ color: `black`, fontWeight: 'bold', fontSize: 18, marginRight: 5 }}>{CartName}</Text>
              <Touch onPress={handleEditCartName} >
                <Icon name="pencil" color={'#000'}  size={14} style={{alignSelf: 'flex-end', borderRadius: 5, marginVertical: 3}}  />
              </Touch>
            </View>
            <Text style={{ color: `black`, fontWeight: 'bold', fontSize: 18 }}>{Email}</Text>
            <Text style={{ color: `black`, fontWeight: 'bold', fontSize: 18 }}>{CustomerName}</Text>
            <Text style={{ color: `black`, fontWeight: 'bold', fontSize: 18 }}>BasketID: {BasketID}</Text>
            <Text style={{ color: `green`, fontWeight: 'bold', fontSize: 20 }}>R$ {formatCurrency(this.calculateCartTotal(cart.item))}</Text>
            <Text style={{ color: Status === 'Aberto' ? `green` : 'red', fontWeight: 'bold', fontSize: 20  }}>{Status}</Text>
          </View>
          <View style={{width: '20%'}}>
            <Touch onPress={handleBuyButtonClick.bind(this)} >
              <Icon name="shopping-cart" color={'#000'}  size={18} style={{alignSelf: 'flex-end', backgroundColor: '#F9C600', padding: 10, borderRadius: 1000, borderWidth: 1, marginVertical: 3}}  />
            </Touch>
            <Touch onPress={handleCartFinishClick.bind(this)}>
              <Icon name="credit-card-alt" color={'#000'}  size={18} style={{alignSelf: 'flex-end', backgroundColor: '#F9C600', padding: 10, borderRadius: 1000, borderWidth: 1, marginVertical: 3}}  />
            </Touch>
            <Touch onPress={handleCartDeleteClick.bind(this)}>
              <Icon name="trash" color={'#000'}  size={18} style={{alignSelf: 'flex-end', backgroundColor: '#F9C600', padding: 10, borderRadius: 1000, borderWidth: 1, marginVertical: 3}}  />
            </Touch>
            <Touch onPress={handleAddCustomer.bind(this)}>
              <Icon name="user-plus" color={'#000'}  size={18} style={{alignSelf: 'flex-end', backgroundColor: '#F9C600', padding: 10, borderRadius: 1000, borderWidth: 1, marginVertical: 3}}  />
            </Touch>
            <Touch onPress={handleCloneCart.bind(this)}>
              <Icon name="copy" color={'#000'}  size={18} style={{alignSelf: 'flex-end', backgroundColor: '#F9C600', padding: 10, borderRadius: 1000, borderWidth: 1, marginVertical: 3}}  />
            </Touch>
          </View>
        </View>
    );
  };


  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
            this.setState({cartToEdit: {}})
          }}
        >          
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput 
                style={{borderWidth: 1, borderColor: '#000', borderRadius: 5, width: 250, marginVertical: 5}} value={this.state.newCartName} 
                onChangeText={(txt) => this.setState({newCartName: txt})} 
                placeholder={'Escolha um nome para seu carrinho'}
              />              
              <View style={{flexDirection: 'row'}}>
                <Btn 
                  onPress={() => this.setModalVisible(false)}
                  label={'fechar'}
                />
                <Btn 
                  onPress={async () => {
                    await createCart({
                      ...this.state.cartToEdit,
                      CartName: this.state.newCartName, 
                      IdVendedor: this.props.session.data.user.userId, 
                      Status: 'Aberto',
                    }) 
                    this.setState({cartToEdit: {}, newCartName: ''})
                    this.updateCartList()
                    this.setModalVisible(false)}                    
                  } 
                  label={Object.keys(this.state.cartToEdit).length > 0 ? 'editar' : 'criar'}
                />
              </View>
            </View>
          </View>
        </Modal>
        
        <View style={{  width: "80%", flexDirection: 'row',  }}>
          <View style={{width: '90%', marginRight: 5}}>
            <FormInput
              returnKeyType="done"
              placeholder="Filtrar por cliente, carrinho ou basketID"
              value={this.state.searchText}
              onChangeText={(searchText) => this.handleSearchCart(searchText)}
              iconRightName="search"
              onIconRightPres={this.updateCartList}
            />        
          </View>
          <Touch onPress={this.updateCartList.bind(this)}>
            <Icon name="refresh" color={'#000'}  size={24} style={{backgroundColor: '#F9C600', padding: 10, borderRadius: 1000, borderWidth: 1, marginVertical: 3}}  />
          </Touch>
        </View>
        
        <View style={{justifyContent: 'center', width: '90%', height:'80%'}}>
          <View style={{flexDirection: 'row', justifyContent:'center', alignItems: 'center'}}>
            <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center', paddingVertical: 4, fontSize: 20}}>Seus Carrinhos</Text>        
            <HeaderButton
              icon="plus"
              iconStyle={{color: "#F9C600" }}
              label="Criar Novo"
              onPress={this.handleNewClick.bind(this)}
            />    
          </View>
          <FlatList
            data={this.state.filteredCarts}
            renderItem={this.renderCartListItem.bind(this)}
            keyExtractor={(item, index) => index}              
            scrollEnabled={true}
            numColumns={1}
          />
        </View>        
        <View style={{position:'absolute', left: 20, right: 0, bottom: 5,}}>
          <Text style={{color:'white', fontSize: 18}}>
            Total Mensal: {formatCurrency(this.state.totals.total)}    Aberto: {formatCurrency(this.state.totals.aberto)}
          </Text>
        </View>
      </View>
    );
  }
}

class Btn extends React.Component {
  render(){
      return(
          <Touch onPress={this.props.onPress} >
              <View  style={{backgroundColor: "#F9C600", paddingVertical: 10, paddingHorizontal: 10, margin: 2, borderRadius: 1000, alignItems:'center'}}>
                  <Text style = {{...this.props.textStyle, textAlign:'center', fontWeight: 'bold'}}>
                      {this.props.label}
                  </Text>
              </View>
          </Touch>
      )
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



export default connect(mapStateToProps)(Sales);
