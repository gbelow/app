import React from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  Alert
} from "react-native";

import {showMessage} from "react-native-flash-message";

import {
  FormInput,
} from "../../config/components";

import {getCustomerList, createCart, createCustomer, updateCart} from '../../services/colcciCustomerApi'

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import { Touch } from "react-native-kin-ui";
import Icon from "react-native-vector-icons/FontAwesome";
import images from "../../const/images";
import styles from "./styles";

const cart = {"BasketAuthorityToken":"9d9c329e9d40826373432c20bc4cf0b0","BasketHash":"13a2a905cb57bc6346095a161b19209d","BasketID":1731737,"CreatedDate":"2022-11-24T14:05:31.9150182-03:00","CustomerID":466583,"Email":"marcel@adapcon.com.br","IdVendedor":"colcci-guilherme.below2@adapcon.com.br","SessionID":"qd2cy0g4gdh0bqilsgcifn1j","ShopperTicketID":"317159a2-c48d-4ae0-97d4-1f73f95f4d8f","WebSiteID":156,"createdAt":"2022-11-25 10:55:04","createdBy":"adapcon","id":9,"itens":[{"BasketItemID":3890410,"BasketPrice":129,"ProductID":1024766,"Quantity":1,"SKU":"044.01.07941-0-0050-PP","SkuID":1024767,"createdAt":"2022-11-25 10:50:47","createdBy":"adapcon","id":1,"updatedAt":"2022-11-25 10:52:15","updatedBy":"adapcon"}],"updatedAt":"2022-11-25 10:55:26","updatedBy":"adapcon"}

const sexes = [
  {label: <Text style={{color: 'white'}}>masc.</Text>, value: 'M'},
  {label: <Text style={{color: 'white'}}>fem.</Text>, value: 'F'}
]

const initCustomer = {
  "BirthDate": "",
  "CPF": "",     
  "Email": "",     
  "Sex": "M",
  "Name": "",      
  "Password": "",   
  "ConfirmPassword": "",   
  "Phone": "",  
  "Surname": "",   
}


class ChooseCustomer extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Escolher Cliente',
    tabBarLabel: "Escolher Cliente",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="shopping-basket" color={tintColor} size={16} />
    ),
  });

  state = {
    searchText: "",
    customerList: [],
    filteredCustomerList:[],
    isCreating: false,
    customer: initCustomer,
    cart: this.props.navigation.state.params.cart,
    updateCartList: this.props.navigation.state.params.updateCartList,
  };

  /**
   * @name afterLoginWithError
   * @description callback after facebook logged with error
   * @return {Object} result
   * @return {Void}
   */

  async componentDidMount() {
    const list = await getCustomerList('colcci')
    this.setState({customerList: list.data, filteredCustomerList: list.data})
  }

  validateCustomer() {

    if(!this.validateEmail(this.state.customer.Email)) throw new Error('email is not valid')
    // if(!this.state.customer.CPF.length != 11) throw new Error('CPF is not valid')
    if((this.state.customer.Password !== this.state.customer.ConfirmPassword)) throw new Error('passwords do not match')
    if(this.state.customer.BirthDate.length !== 8) throw new Error('date is not valid')

  }

  async handleNewClick(){
    this.setState({isCreating: !this.state.isCreating})
  }

  async handleConfirmCreateClick(){
    try {
      this.validateCustomer()
      await createCustomer(this.state.customer)
      // this.setState({isCreating: !this.state.isCreating})
    }catch(err){
      console.log(err, 'not valid')
      return
    }
  }

  handleCancelClick(){
    this.setState({isCreating: !this.state.isCreating, customer: initCustomer})
  }

  handleAddClientToCartClick (client) {

    return(
      async () => {
        const addClientToCart = async() => {
          let cart = this.state.cart
          
          cart = {...cart, Email: client.email, CustomerID: client.idCliente, }
          const resp = await createCart(cart)

          if(resp){
            this.props.navigation.state.params.updateCartList()
            showMessage({
              message: `Adicionado com sucesso!`,
              type: "success",
              duration: 1000,
            });
          }else{
            showMessage({
              message: `deu algo de errado!`,
              type: "warning",
              duration: 1000,
            });
          }
        }    
    
        Alert.alert('Adicionar cliente ao Carrinho', `Deseja adicionar um cliente ao carrinho?`, [
          {
            text: "Não",
            onPress: () => null,
          },
          { text: "Sim", onPress: async () => await addClientToCart() }  
        ])
      }
    )
  }

  renderClientListItem(client) {
    const { canal, cpf, email, nome } = client.item;    

    return (
      <Touch onPress={this.handleAddClientToCartClick(client.item)}>
        <View
          style={{
            paddingVertical: 5,
            justifyContent: "space-between",
            borderColor: 'white',
            borderWidth: 1,
            borderColor: "#F9C600",
            backgroundColor: 'black',
            borderRadius: 5,
            paddingHorizontal: 5,
            marginVertical: 8,
            height: 50
          }}
        >
          <Text style={{ color: `white` }}>{nome}</Text>
          <Text style={{ color: `white` }}>{email}</Text>
        </View>
      </Touch>
    );
  }

  async handleCreateCustomerClick() {
    const resp = await createCustomer()
  }

  onChangeCustomerFormText(id) {
    return (
      (text) => {
        this.setState({customer: {...this.state.customer, [id]: text}})
      }) 
  }

  onChangeCartFormText(id) {
    return (
      (text) => {
        this.setState({customer: {...this.state.cart, [id]: text}})
      }) 
  }

  validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  handleSearchTextChange(searchText) {
    this.setState({searchText: searchText})
    
    this.setState({filteredCustomerList: this.state.customerList.filter(el => 
      el.nome?.toLowerCase().startsWith(searchText.toLowerCase()) ||
      el.email?.toLowerCase().startsWith(searchText.toLowerCase()) 
      )})
  }

  async handleRemoveClientClick() {
    const {CartName, WebSiteID, IdVendedor, Items, CartID} = this.state.cart

    const removeClientFromCart = async () => {
      const resp = await createCart({CartName, Status: 'Aberto', WebSiteID, IdVendedor, Items, CartID })
      if(resp){
        this.props.navigation.state.params.updateCartList()
        showMessage({
          message: `Removido com sucesso!`,
          // description: "This is our second message",
          type: "success",
          duration: 1000,
        });
      }else{
        showMessage({
          message: `deu algo de errado!`,
          // description: "This is our second message",
          type: "warning",
          duration: 1000,
        });
      }
    }

    Alert.alert('Remover cliente do Carrinho', `Deseja remover o cliente do carrinho?`, [
      {
        text: "Não",
        onPress: () => null,
      },
      { text: "Sim", onPress: async () => await removeClientFromCart() }  
    ])

    
  }

  async handleSearchClientClick() { 
    const list = await getCustomerList({Canal: 'colcci', name: this.state.searchText})
    this.setState({customerList: list.data, filteredCustomerList: list.data})
  }

  renderCreateNewClient() {
    return(
      <View>
        <Text style={{fontSize: 18, color: 'white', marginBottom: 8}}>Criar novo cliente</Text>
        <TextInput style={{ backgroundColor: 'white', marginVertical: 2, paddingVertical: 1}} placeholder={'*Nome'} value={this.state.customer.Name} onChangeText={this.onChangeCustomerFormText('Name').bind(this)}/>
        <TextInput style={{ backgroundColor: 'white', marginVertical: 2, paddingVertical: 1}} placeholder={'*Sobrenome'} value={this.state.customer.Surname} onChangeText={this.onChangeCustomerFormText('Surname').bind(this)}/>
        <TextInput style={{ backgroundColor: 'white', marginVertical: 2, paddingVertical: 1}} placeholder={'*Email'} value={this.state.customer.Email} onChangeText={this.onChangeCustomerFormText('Email').bind(this)}/>
        <RadioForm
          radio_props={sexes}
          initial={this.state.customer.Sex}
          formHorizontal={true}
          animation={true}
          labelColor={'#FFFFFF'}
          onPress={(value) => {this.setState({customer:{...this.state.customer, Sex: value}})}}
        />
        <TextInput style={{ backgroundColor: 'white', marginVertical: 2, paddingVertical: 1}} placeholder={'CPF'} value={this.state.customer.CPF} onChangeText={this.onChangeCustomerFormText('CPF').bind(this)}/>
        <TextInput style={{ backgroundColor: 'white', marginVertical: 2, paddingVertical: 1}} placeholder={'data de nascimento'} value={this.state.customer.BirthDate} onChangeText={this.onChangeCustomerFormText('BirthDate').bind(this)}/>
        <TextInput style={{ backgroundColor: 'white', marginVertical: 2, paddingVertical: 1}} placeholder={'telefone'} value={this.state.customer.Phone} onChangeText={this.onChangeCustomerFormText('Phone').bind(this)}/>
        <TextInput style={{ backgroundColor: 'white', marginVertical: 2, paddingVertical: 1}} placeholder={'*senha'} value={this.state.customer.Password} onChangeText={this.onChangeCustomerFormText('Password').bind(this)}/>
        <TextInput style={{ backgroundColor: 'white', marginVertical: 2, paddingVertical: 1}} placeholder={'*confirma senha'} value={this.state.customer.ConfirmPassword} onChangeText={this.onChangeCustomerFormText('ConfirmPassword').bind(this)}/>
        <View style={{flexDirection: 'row', marginTop: 5}}>
          <Touch onPress={this.handleCancelClick.bind(this)} >
            <Text style={{marginHorizontal: 3, backgroundColor: '#F9c600', padding: 5, borderRadius: 5}}>Voltar</Text>
          </Touch>
          <Touch onPress={this.handleConfirmCreateClick.bind(this)}>
            <Text style={{marginHorizontal: 3, backgroundColor: '#F9c600', padding: 5, borderRadius: 5}}>Confirmar</Text>
          </Touch>
        </View>
      </View> 
    )
  }

  renderCreateNewCartModel() {
    return(
      <View style={{width: '90%'}}>
        <TextInput style={{ backgroundColor: 'white', marginVertical: 2, paddingVertical: 1}} placeholder={'Nome do Carrinho'} value={this.state.customer.CPF} onChangeText={this.onChangeCartFormText('NomeCarrinho').bind(this)}/>
        <Touch onPress={async () => {
          const cart = await createCart(this.state.cart)
          this.props.navigation.navigate( 'NewCart', {cart})
        }}>
          <Text style={{color:'white'}}>Criar</Text>
        </Touch>
      </View>
    )
  }
 

  render() {
    return (
      <View style={styles.container}>  
        <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
          <Touch onPress={this.handleNewClick.bind(this)} style={{width: "30%"}}>
              <View style = {{flexDirection: 'row', padding: 8, borderWidth: 1, backgroundColor: "#F9C600", borderRadius: 5 }}>
                <Text >Criar Novo Cliente </Text>
                <Icon name={'plus'}  size={16} icon={'plus'} />
            </View>
          </Touch>  
          <Touch onPress={this.handleRemoveClientClick.bind(this)} style={{width: "30%"}}>
              <View style = {{flexDirection: 'row', padding: 8, borderWidth: 1, backgroundColor: "#F9C600", borderRadius: 5 }}>
                <Text >Remover cliente </Text>
                <Icon name={'times'}  size={16} icon={'times'} />
            </View>
          </Touch>   
        </View>
        <View style={{ width: '80%', paddingVertical: 10}}>          
          <View style={{flexDirection: 'row', width: '100%' }}>
            <View style={{width: '100%'}}>
              <FormInput
                iconRightName="search"
                returnKeyType="done"
                placeholder="Filtrar por nome ou email"
                value={this.state.searchText}
                onChangeText={this.handleSearchTextChange.bind(this)}  
                onIconRightPress={this.handleSearchClientClick.bind(this) }
              />        
            </View>
                      
          </View >
          <View style={{height: '90%'}}>
            <FlatList
              data={this.state.filteredCustomerList}
              renderItem={this.renderClientListItem.bind(this)}
              keyExtractor={(item, index) => index}
              numColumns={1}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ session,}) => ({
  session,
});
// const mapDispatchToProps = () => ({})

export default connect(mapStateToProps)(ChooseCustomer);

