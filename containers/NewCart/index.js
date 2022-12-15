import React from "react";
import { connect } from "react-redux";
import RNFetchBlob from "react-native-fetch-blob";
import {
  Text,
  View,
  Image,
  FlatList,
  CheckBox,  
  Modal,
} from "react-native";

import Share from "react-native-share";
import prods from "./data.json"

import { getCustomer, searchProduct, addItemToCart, addItemToBasket } from "../../services/colcciCustomerApi";
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
    // productList: prods.data.map(el => ({...el, isSelected: false, isAdding: false, selectedColor: null, selectedSize: null})),
    productList: [],
    selectedClient: {name:'', cpf: ''},
    cart: this.props.navigation.state.params.cart,
    lastId: 0,
    modalImage: {},
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

  async componentDidMount() {
    const list = await searchProduct({})
    if(list){
      this.setState({
        productList: list.data.map(el => ({...el, isSelected: false, isAdding: false, selectedColor: null, selectedSize: null}))
      })
    }
  }

  // async componentDidUpdate(){
  //   if(!this.state.productList){
  //     const list = await searchProduct()
  //     this.setState({
  //       productList: list.Products
  //     })
  //   }
  // }

  async handleSearchProductClick(){
    this.setState({loading: true})
    const list = await searchProduct({filter: this.state.searchText})
    if(list){
      this.setState({
        loading:false, 
        productList: list.data.map(el => ({...el, isSelected: false, isAdding: false, selectedColor: null, selectedSize: null})), lastId: list.meta.lastId})
    }
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
      const prodItem = this.getProductItemSku(item)
      if(!prodItem){
        showMessage({
          message: `Escolha uma cor e tamanho para comprar`,
          // description: "This is our second message",
          type: "warning",
          duration: 1000,
        });
        return
      }
      
      const prod = {
        "ProductID": item.productId,
        "SkuID": prodItem.skuId,
        "Quantity": 1
      }

      const {SessionID, BasketID, CartID} = this.state.cart
      
      let baskProduct = {}
      console.log(SessionID, BasketID, 'consoo')
      if(SessionID && BasketID){
        const resp = await addItemToBasket({basketId: BasketID, sessionId: SessionID, product: prod})    
        
        if(!resp.error){
          baskProduct = resp.data.Shopper.Basket.Items.find(el => el.ProductID == item.productId)          
        }else{
          return
        }
      }
      
      const resp2 = await addItemToCart({
        CartID,
        BasketID, 
        BasketItemID: baskProduct?.BasketItemID, 
        SKU: prodItem.sku,
        Quantity: '1',
        WebsiteID: '156',
        SkuID: prodItem.skuId,
        ProductID: item.productId,
        BasketPrice: item.precoAtualPromocao.length > 0 ? item.precoAtualPromocao : item.precoOriginal,
        ProductSize: prodItem.tamanho,
        ProductColor: prodItem.descCor,
      })

      if(resp2){
        showMessage({
          message: `${item.nome} Adicionado!`,
          // description: "This is our second message",
          type: "success",
          duration: 1000,
        });
        return
      }
      showMessage({
        message: `Falhou!`,
        description: resp.error.join('\n'),
        type: "warning",
        duration: 1000,
      });
      
    }catch(err){ 
      
      console.log(err, 'Nao adicionado')
    }
  }

  async retrieveMore() {
    const {lastId, searchText, productList} = this.state
    const list = await searchProduct({filter: searchText, lastId })
    const moddedList = list.data.map(el => ({...el, isSelected: false, isAdding: false, selectedColor: null, selectedSize: null}))
    this.setState({productList: [...productList, ...moddedList], lastId: list.meta.lastId})
  }

  handleImageClick(image) {
    return(
      () => {
        this.setState({modalImage: image})

      }
    )
  }

  renderProductItem({item, index}) {
    const {isSelected, isAdding, productId, nome, precoOriginal, precoAtualPromocao, estoque, referenciaEditada} = item
    const isPromo = precoAtualPromocao ? true : false
    const preco = precoAtualPromocao ? precoAtualPromocao : precoOriginal

    return(
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 5,
          borderBottomWidth: 1,
          borderBottomColor: `white`,
          justifyContent: 'space-between',
        }}
      >
        {
          isAdding ?
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '90%'}}>
              <Touch onPress={this.handleImageClick(item).bind(this)} >
                <Image
                  source={{
                    uri: estoque[0]?.midias[0],
                  }}
                  style={{...styles.image, borderRadius: 5, }}
                  />
              </Touch>
              <View>
                <ModalDropdown 
                  options={this.getAvailableColors(estoque)}
                  style={styles.dropdown_2} 
                  textStyle={styles.dropdown_2_text}
                  dropdownTextStyle={styles.dropdown_2_text}
                  dropdownStyle={{...styles.dropdown_2_dropdown, height: this.getAvailableColors(estoque).length*60 }}
                  dropdownSeparatorStyle={styles.dropdown_2_separator} 
                  defaultValue= {item. selectedColor ?? 'Cor'} 
                  onSelect={(i) => this.setState({productList: this.state.productList.map(el => item.productId === el.productId ? {...el, selectedColor: this.getAvailableColors(el.estoque)[i]} : el) }) }
                />
                <ModalDropdown 
                  options={this.getAvailableSizes(estoque)} 
                  style={styles.dropdown_2} 
                  textStyle={styles.dropdown_2_text}
                  dropdownTextStyle={styles.dropdown_2_text}
                  dropdownStyle={{...styles.dropdown_2_dropdown, height: this.getAvailableSizes(estoque).length*35+20 }}
                  dropdownSeparatorStyle={styles.dropdown_2_separator} 
                  defaultValue= {item. selectedSize ?? 'Tamanho'} 
                  onSelect={(i) => this.setState({productList: this.state.productList.map(el => item.productId === el.productId ? {...el, selectedSize: this.getAvailableSizes(el.estoque)[i]} : el) }) }
                />
              </View>
              <View >
                <Text style={{color:'white'}} >Estoque:{this.getProductItemSku(item)?.quantidade ?? '' } </Text>
              </View>
              <View style={{alignItems: 'flex-end' }} >
                <Btn label={<Icon name="undo" color={'#000'}  size={24}  />}  onPress={this.handleAddItemClick(item, index).bind(this)} />
                <Btn label={<Icon name="cart-plus" color={'#000'}  size={24}  />}  onPress={async () => await this.addToBasket(item)} />
              </View>
            </View>
            :
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '90%'}}>
                <View style={{flexDirection: 'row',}}>
                <Touch onPress={this.handleItemClick(item, index).bind(this)}>
                  <CheckBox value={isSelected} disabled= {true} tintColors={{ true: '#F9C600', false: 'black' }} />
                </Touch>
                <Touch onPress={this.handleImageClick(item).bind(this)} >
                  <Image
                    source={{
                      uri: estoque[0]?.midias[0],
                    }}
                    style={{...styles.image, borderRadius: 5, borderWidth: 2}}
                    />
                </Touch>
                </View>
              <View  style={{ width: '40%', marginLeft: 3}}>
                <Text style={{ color: `white` }}>{referenciaEditada}</Text>
                <Text style={{ color: `white` }}>{nome}</Text>
                <Text style={{ color: isPromo ? 'green' : 'white',  }}>R$ {formatCurrency(preco)}</Text>
              </View>
              <View style={{justifyContent: 'space-around'}}>
                <Btn label={<Icon name="tag" color={'#000'}  size={24}  />}  onPress={this.handleAddItemClick(item, index).bind(this)}  />  
              </View>
            </View>
        }
      </View>
    )
  }

  render() {
    const { CartName, CustomerName} = this.state.cart
    console.log(this.state.productList)
    return (
      <View style={styles.container}>
        <View style={{  width: "90%" }}>            
            <View style={{ paddingVertical: 10, justifyContent: 'space-between' }}>
              <Text style={{ color: "white", fontWeight: 'bold', fontSize: 16 }}>Carrinho: {CartName} </Text>
              <Text style={{ color: "white", fontWeight: 'bold', fontSize: 16 }}>Cliente: {CustomerName}</Text>
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
        {
          this.state.loading ? 
            <View style={{height: '100%', justifyContent: 'center', alignContent: 'center'}}>
              <Text>
                Load logo...
              </Text>
            </View>
            :
            <View style={{
              height:  '70%',
              paddingVertical: 5,
              alignItems: 'center',
          }}>            
              <View >
                  <FlatList
                    removeClippedSubviews={false}
                    data= {this.state.productList}
                    renderItem={this.renderProductItem.bind(this)}
                    keyExtractor={(item, index) => item.productId}
                    scrollEnabled={true}
                    numColumns={1}
                    onEndReached={this.retrieveMore.bind(this)}
                    onEndReachedThreshold={0}
                    refreshing={true}
                  />
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '60%', marginTop: 10}}>
                <Btn label={<Icon name="times" color={'#000'}  size={24}  />} onPress={this.clearProductListChecks.bind(this)} textStyle={{color: 'white'}}  />         
                        
                <Btn label={<Icon name="share-alt" color={'#000'}  size={24}  />}  onPress={this.handleShareButtonClick.bind(this)} />         
                <Btn label={<Icon name="shopping-cart" color={'#000'}  size={24}  />}  onPress={this.handleCartButtonClick.bind(this)}/>   
              </View>
            </View>
        }
        <FlashMessage position="top" />
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
                  {this.state.modalImage.nome}
                </Text>
                <Text style={{color:'#fff', marginVertical: 5, fontWeight: 'bold', fontSize: 16}}>
                  {this.state.modalImage.referenciaEditada}
                </Text>
                <Image
                  source={{
                    uri: this.state.modalImage ? this.state.modalImage.estoque[0]?.midias[0] : '',
                  }}
                  style={{width: 300, height: 400, margin: 0, borderRadius: 5, borderWidth: 2}}
                  />
                  <Text style={{color:'#fff', marginVertical: 5, fontWeight: 'bold', fontSize: 16}}>
                  {this.state.modalImage ? this.state.modalImage.estoque[0]?.base : ''}
                </Text>
                <Text style={{color:'#fff', marginVertical: 5, fontWeight: 'bold', fontSize: 16}}>
                  {this.state.modalImage ? this.state.modalImage.estoque[0]?.tecido : ''}
                </Text>
                <Text style={{color:'#fff', marginVertical: 5, fontWeight: 'bold', fontSize: 16}}>
                  {this.state.modalImage ? (this.state.modalImage.estoque[0]?.composicao || this.state.modalImage.estoque[0]?.composição ) : ''}
                </Text>
                <Text style={{color:'#fff', marginVertical: 5, fontWeight: 'bold', fontSize: 16}}>
                  Preço original: {this.state.modalImage.precoOriginal}
                </Text>
                <Text style={{color:'green', marginVertical: 5, fontWeight: 'bold', fontSize: 16}}>
                Preço na promoção: {this.state.modalImage.precoAtualPromocao}
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

const mapStateToProps = ({ session }) => ({
  session,
});
// const mapDispatchToProps = () => ({})

export default connect(mapStateToProps)(NewCart);




