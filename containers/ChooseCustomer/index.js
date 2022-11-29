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

import {getCustomerList, createCart} from '../../services/colcciCustomerApi'

import { Touch } from "react-native-kin-ui";
import Icon from "react-native-vector-icons/FontAwesome";
import images from "../../const/images";
import styles from "./styles";

const cart = {"BasketAuthorityToken":"9d9c329e9d40826373432c20bc4cf0b0","BasketHash":"13a2a905cb57bc6346095a161b19209d","BasketID":1731737,"CreatedDate":"2022-11-24T14:05:31.9150182-03:00","CustomerID":466583,"Email":"marcel@adapcon.com.br","IdVendedor":"colcci-guilherme.below2@adapcon.com.br","SessionID":"qd2cy0g4gdh0bqilsgcifn1j","ShopperTicketID":"317159a2-c48d-4ae0-97d4-1f73f95f4d8f","WebSiteID":156,"createdAt":"2022-11-25 10:55:04","createdBy":"adapcon","id":9,"itens":[{"BasketItemID":3890410,"BasketPrice":129,"ProductID":1024766,"Quantity":1,"SKU":"044.01.07941-0-0050-PP","SkuID":1024767,"createdAt":"2022-11-25 10:50:47","createdBy":"adapcon","id":1,"updatedAt":"2022-11-25 10:52:15","updatedBy":"adapcon"}],"updatedAt":"2022-11-25 10:55:26","updatedBy":"adapcon"}

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
    isCreating: false,
  };

  /**
   * @name afterLoginWithError
   * @description callback after facebook logged with error
   * @return {Object} result
   * @return {Void}
   */

  async componentDidMount() {
    const list = await getCustomerList('colcci')
    this.setState({customerList: list.data})
  }

  handleCreateClick(){
    this.setState({isCreating: !this.state.isCreating})
  }

  renderClientList(client) {
    const { canal, cpf, email, nome } = client.item;
    return (
      <Touch onPress={() => createCart()}>
        <View
          style={{
            flexDirection: "row",
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

  render() {
    return (
      <View style={styles.container}>
        
        {
          this.state.isCreating ?
          <View>
            <Text>I am creating</Text>
            <Touch onPress={this.handleCreateClick.bind(this)} >
              <Text>Voltar</Text>
            </Touch>
          </View>
          :
        <View style={{ width: '80%', paddingVertical: 10}}>
          <View style={{flexDirection: 'row', width: '100%' }}>
          <View style={{width: '80%', marginRight: 5}}>
            <FormInput
              iconRightName="search"
              returnKeyType="done"
              placeholder="Pesquisar cliente"
              value={this.state.searchText}
              onChangeText={(searchText) => this.setState({searchText: searchText})}
              // onIconRightPress={this.handleSearchProductClick.bind(this) }
            />        
        </View>
          <Touch onPress={this.handleCreateClick.bind(this)} style={{width: "30%"}}>
              <View style = {{flexDirection: 'row', padding: 8, borderWidth: 1, backgroundColor: "#F9C600", borderRadius: 5 }}>
                <Text >Novo </Text>
                <Icon name={'plus'}  size={16} icon={'plus'} />
            </View>
          </Touch>
          
        </View> 
          <FlatList
            data={this.state.customerList}
            renderItem={this.renderClientList.bind(this)}
            keyExtractor={(item, index) => index}
            numColumns={1}
          />
        </View>
        }         
      </View>
    );
  }
}

export default ChooseCustomer;
