import React from "react";
import { connect } from "react-redux";
import RNFetchBlob from "react-native-fetch-blob";
import {
  Text,
  View,
  Image,
  FlatList,
  CheckBox,  
} from "react-native";

import Share from "react-native-share";
import prods from "./data.json"

import { getCustomer, searchProduct, addItemToCart } from "../../services/colcciCustomerApi";
import ModalDropdown from "react-native-modal-dropdown"; 
import FlashMessage, {showMessage, hideMessage } from 'react-native-flash-message'

import {
  MenuItem,
  HeaderButton,
  FormInput,
  Button,
} from "../../config/components";

import { Touch } from "react-native-kin-ui";
import { name, appId, mode } from "../../package.json";
import theme from "../../const/theme";
import Icon from "react-native-vector-icons/FontAwesome";
import images from "../../const/images";
import styles from "./styles";

class NewCart extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Vender',
    tabBarLabel: "Vender",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="shopping-basket" color={tintColor} size={16} />
    ),
  });

  state = {
    searchText: "",
    productList: prods.data.map(el => ({...el, isSelected: false, isAdding: false, selectedColor: null, selectedSize: null})),
    selectedClient: {name:'Lucas', cpf: '05425658754'},
    cart: this.props.navigation.state.params.cart
  };

  constructor(props){
    super(props)
    // this.imgRefs = React.createRef({})
  } 

  /**
   * @name afterLoginWithError
   * @description callback after facebook logged with error
   * @return {Object} result
   * @return {Void}
   */

  async componentDidUpdate(){
    if(!this.state.productList){
      const list = await searchProduct()
      this.setState({
        productList: list.Products
      })
    }
  }

  async handleSearchProductClick(){
    const list = await searchProduct(this.state.searchText)
    this.setState({productList: list.data.map(el => ({...el, isSelected: false, isAdding: false, selectedColor: null, selectedSize: null}))})
  }

  clearProductListChecks() {
    this.setState({
      productList: this.state.productList.map(el => ({...el, isSelected: false}))
    })
  }

  handleItemClick(item, index) {
    return(
      () => this.setState({productList: this.state.productList.map((el, i)=> i===index ? {...el, isSelected: !el.isSelected} : el )})    
    )
  }

  handleAddItemClick(item, index) {
    return(
      () => this.setState({productList: this.state.productList.map((el, i)=> i===index ? {...el, isAdding: !el.isAdding} : el )})
    )
  }

  async handleAddItemToBasket(item){
    return 'bozo'
  }


  async onShare (products) {  
    const names = products.map(el => el.nome)

    const toBase64 = async (url) => {
      try{
        const resp = await RNFetchBlob.fetch('GET', url)
        return 'data:image/jpeg;base64,' + resp.base64() ;
      }catch(err){
        console.log(err)
      }
    }

    const share = async (url) => {
      try {
        await Share.shareSingle({
          title: 'an Image',
          failOnCancel: false,
          urls: url,
          social: Share.Social.WHATSAPP,
          type: 'image/jpeg',
          filename:  names,
          whatsAppNumber: "5547988021634"
        });
      } catch (error) {
        alert(error.message);
      }
    }

    const urls = await Promise.all(products.map(async el => await toBase64(el.estoque[0]?.midias[0])))

    await share(urls)

  };

  async handleShareButtonClick(){
    await this.onShare(this.state.productList.filter(el => el.isSelected))
  }

  async handleCartButtonClick() {
    this.props.navigation.navigate("CartDetails", {cart: this.state.cart} )
  }

  getAvailableColors(estoque){
    let colors = []
    for(const x of estoque){
      if(!colors.includes(x.descCor) ){
        colors.push(x.descCor)
      } 
    }
    return colors
  }
  getAvailableSizes(estoque){
    let sizes = []
    for(const x of estoque){
      if(!sizes.includes(x.tamanho) ){
        sizes.push(x.tamanho)
      }
    }
    return sizes
  }

  getProductItemSku(item ){
    const {estoque} = item
    return estoque.find(
      el =>  el.tamanho === item.selectedSize && el.descCor === item.selectedColor
    )
  }

  async addToBasket(item){
    try{
      const prod = {
        "ProductID": item.productId,
        "SkuID": this.getProductItemSku(item).skuId,
        "Quantity": 1
      }
      const resp = await addItemToCart('19687', 'rn2uknhjvwrbbbmelpc2o5ej', [prod])
      if(resp){
        showMessage({
          message: `${item.nome} Adicionado!`,
          // description: "This is our second message",
          type: "success",
          duration: 1000,
        });
      }else{
        showMessage({
          message: `Falhou!`,
          // description: "This is our second message",
          type: "warning",
          duration: 1000,
        });
      }
    }catch(err){
      
      console.log(err)
    }
  }

  renderProductItem({item, index}) {
    const {isSelected, isAdding, productId, nome, precoOriginal, precoAtualPromocao, estoque} = item
    
    return(
      <View
          style={{
          flexDirection: "row",
          paddingVertical: 5,
          borderBottomWidth: 1,
          borderBottomColor: `white`,
          }}
      >
        {
          isAdding ?
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
              <Image
                  source={{
                    uri: estoque[0]?.midias[0],
                  }}
                  style={{...styles.image, borderRadius: 5, borderWidth: 2, borderColor:'red'}}
              />
              <View>
                <ModalDropdown 
                  options={this.getAvailableColors(estoque)}
                  style={{borderWidth:1, borderColor: 'black', width: 80, height: 40, backgroundColor: 'white', borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginHorizontal: 5 }} 
                  defaultValue= {item. selectedColor ?? 'Cor'} 
                  onSelect={(i) => this.setState({productList: this.state.productList.map(el => item.productId === el.productId ? {...el, selectedColor: this.getAvailableColors(el.estoque)[i]} : el) }) }
                  />
                <ModalDropdown 
                  options={this.getAvailableSizes(estoque)} 
                  style={{borderWidth:1, borderColor: 'black', width: 80, height: 40, backgroundColor: 'white', borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginHorizontal: 5 }} 
                  defaultValue= {item. selectedSize ?? 'Tamanho'} 
                  onSelect={(i) => this.setState({productList: this.state.productList.map(el => item.productId === el.productId ? {...el, selectedSize: this.getAvailableSizes(el.estoque)[i]} : el) }) }
                />
              </View>
              <View>
                <Text style={{color:'white'}} >Estoque:{this.getProductItemSku(item)?.quantidade ?? '' } </Text>
              </View>
              <View>
              <Btn label="Adicionar"  onPress={async () => await this.addToBasket(item)} />
              <Btn label="Voltar"  onPress={this.handleAddItemClick(item, index).bind(this)} />
              </View>
            </View>
            :
            <>
              <Touch onPress={this.handleItemClick(item, index).bind(this)}>
                <View style={{flexDirection: 'row', width: '30%'}}>
                {/* <CheckBox value={isSelected} disabled= {true} tintColors={{ true: '#F9C600', false: 'black' }} /> */}
                <Image
                  source={{
                    uri: estoque[0]?.midias[0],
                  }}
                  style={{...styles.image, borderRadius: 5, borderWidth: 2, borderColor: isSelected ? 'red': 'black'}}
                  />
                </View>
              </Touch>
              <View  style={{ width: '40%', marginLeft: 3}}>
                <Text style={{ color: `white` }}>{productId}</Text>
                <Text style={{ color: `white` }}>{nome}</Text>
                <Text style={{ color: `white` }}>R$ {formatCurrency(precoOriginal)}</Text>
              </View>
              <View style={{justifyContent: 'space-around'}}>
                <Btn label="Whats"  onPress={() => this.onShare([item])} />  
                <Btn label="Adicionar"  onPress={this.handleAddItemClick(item, index).bind(this)}  />  
              </View>
            </>
        }
      </View>
    )
  }

  render() {
    const {BasketID, CustomerID, Email} = this.state.cart
    
    return (
      <View style={styles.container}>
        <View style={{  width: "90%" }}>
            
            <View style={{ paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: "white" }}>Carrinho: {BasketID} </Text>
            <Text style={{ color: "white" }}>Cliente: {Email}</Text>
            </View>
            <FormInput
              ref="searchProduct"
              iconRightName="search"
              returnKeyType="done"
              placeholder="Pesquisar produto"
              value={this.state.searchText}
              onChangeText={(searchText) => this.setState({searchText: searchText})}
              onIconRightPress={this.handleSearchProductClick.bind(this) }
            />
        </View>
        <View style={{
            width: "90%",
            height: '75%',
            paddingVertical: 5,
            justifyContent: "space-between",
        }}>
            <FlatList 
                data= {this.state.productList}
                renderItem={this.renderProductItem.bind(this)}
                keyExtractor={(item, index) => item.productId}
                scrollEnabled={true}
                numColumns={1}
            />
        </View>
            <View style={{flexDirection: 'row', alignItems: 'stretch', height: '10%'}}>
            <Btn label="Limpar"  onPress={this.clearProductListChecks.bind(this)} textStyle={{color: 'white'}} containerStyle={{backgroundColor: 'yellow', borderRadius: 5}} />         
                    
            <Btn label="Compartilhar"  onPress={this.handleShareButtonClick.bind(this)} />         
            <Btn label="Ir para Carrinho"  onPress={this.handleCartButtonClick.bind(this)}/>   
        </View>
        <FlashMessage position="top" />
      </View>
    );
  }
}

class Btn extends React.Component {
    render(){
        return(
            <Touch onPress={this.props.onPress} >
                <View containerStyle = {this.props.containerStyle} style={{backgroundColor: "#F9C600", paddingVertical: 15, paddingHorizontal: 5, margin: 2, borderRadius: 1000, alignItems:'center'}}>
                    <Text containerStyle = {{...this.props.textStyle, textAlign:'center', fontWeight: 'bold'}}>
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

export default NewCart;



