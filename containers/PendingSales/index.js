import React from 'react';
import {connect} from 'react-redux';
import {View, Alert, FlatList, Text} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Button,
  NoResults,
  TicketItem,
  TicketModal,
  HeaderButton,
  DetailModal,
  HistoryDetailItem,
} from '../../config/components';

import {
  saleSincronizeRequest,
  saleDeleteRequest,
  saleFeedbackReset,
} from '../../actions/saleActions';

import {salesHistoryRequest} from '../../actions/historyActions';
import images from '../../const/images';
import styles from './styles';

class PendingSales extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title,
    tabBarLabel: 'Vendas',
    tabBarIcon: ({tintColor}) => (
      <Icon name="shopping-basket" color={tintColor} size={16} />
    ),
    headerRight: (
      <HeaderButton
        icon="plus"
        iconStyle={styles.headerIconStyle}
        style={styles.headerButtonStyle}
        label="Nova"
        navigation={navigation}
        routeName="NewSale"
      />
    ),
  });

  state = {
    showTicketModal: false,
    ticket: [],
  };

  toggleTicketModal(ticket) {
    this.setState({
      showTicketModal: !this.state.showTicketModal,
      ticket,
    });
  }

  /**
   * @name renderTicketItem
   * @description render sale item
   * @returns {Component} SaleItem
   */
  renderTicketItem({item}) {
    return (
      <TicketItem
        id={item.saleId}
        items={item.items}
        showTicketItems={this.toggleTicketModal.bind(this, item)}
        onDelete={this.handleDeleteItem.bind(this, item)}
      />
    );
  }

  /**
   * @name rendersaleItem
   * @description render sale item
   * @returns {Component} SaleItem
   */
  renderSaleItem({item}) {
    if (item.items && item.items.length) {
      let sales = item.items.map((item, index) => {
        return (
          <HistoryDetailItem
            key={index}
            tag={item.tag}
            error={item.error}
            status={item.status}
          />
        );
      });

      return sales;
    }
  }

  /**
   * @name handleDelete
   * @description callback on delete item
   * @returns {Void}
   */
  handleDeleteItem(item) {
    Alert.alert(
      'Tem certeza?',
      'A venda será removida',
      [
        {
          text: 'Cancelar',
          style: 'default',
        },
        {
          text: 'Confirmar',
          style: 'destructive',
          onPress: () => {
            this.props.delete(item);
          },
        },
      ],
      {cancelable: false},
    );
  }

  /**
   * @name handleSubmit
   * @description callback on delete item
   * @returns {Void}
   */
  handleSubmit() {
    if (this.props.connection) {
      this.props.sincronize();
    } else {
      Alert.alert(
        'Ops...',
        'Você está sem conexão no momento. Envie os dados mais tarde :)',
        [{text: 'Entendi'}],
        {cancelable: false},
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.sales.data}
          extraData={this.props}
          renderItem={this.renderTicketItem.bind(this)}
          keyExtractor={(item) => item.saleId}
          numColumns={2}
          ListEmptyComponent={() => {
            if (this.props.sales.data.length === 0) {
              return (
                <NoResults
                  image={images.basket}
                  text="Nenhuma venda para enviar"
                />
              );
            }

            return null;
          }}
        />
        {this.state.showTicketModal && (
          <TicketModal
            visible={this.state.showTicketModal}
            onClose={this.toggleTicketModal.bind(this)}
            ticket={this.state.ticket}
          />
        )}
        {this.props.saleFeedback.data && (
          <DetailModal
            title="Vendas enviadas!"
            visible={this.props.saleFeedback.data ? true : false}
            onClose={this.props.saleFeedbackReset.bind(this)}>
            <View style={styles.feedbackContainer}>
              <Text style={styles.description}>
                Confira abaixo o status de cada item enviado ou posteriormente
                no menu histórico.
              </Text>
              <FlatList
                data={this.props.saleFeedback.data.sales}
                keyExtractor={(item, index) => index}
                renderItem={this.renderSaleItem.bind(this)}
              />
            </View>
          </DetailModal>
        )}
        <Button
          label="Enviar vendas"
          onPress={this.handleSubmit.bind(this)}
          disabled={this.props.sales.data.length === 0}
        />
      </View>
    );
  }
}

const mapStateToProps = ({sales, connection, session, saleFeedback}) => ({
  sales,
  connection,
  session,
  saleFeedback,
});

const mapDispatchToProps = (dispatch) => ({
  delete(data) {
    dispatch(saleDeleteRequest(data));
  },
  sincronize() {
    dispatch(saleSincronizeRequest());
  },
  salesHistoryRequest() {
    dispatch(salesHistoryRequest());
  },
  saleFeedbackReset() {
    dispatch(saleFeedbackReset());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PendingSales);
