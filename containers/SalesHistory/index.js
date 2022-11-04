import React from 'react';
import {connect} from 'react-redux';
import {View, Text, FlatList} from 'react-native';

import {
  SaleHistoryItem,
  HistoryDetailItem,
  DetailModal,
  NoResults,
  NoConnection,
} from '../../config/components';

import {salesHistoryRequest} from '../../actions/historyActions';
import images from '../../const/images';
import styles from './styles';

class SalesHistory extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title,
    headerRight: <View />,
  });

  state = {
    item: null,
    detailModalVisibility: false,
    page: 1,
  };

  componentDidMount() {
    this.props.loadHistory();
  }

  renderHistoryItem({item}) {
    if (item.items) {
      return (
        <SaleHistoryItem
          id={item.saleId}
          date={item.date}
          items={item.items}
          status={item.status}
          toggleDetailModal={() => {
            this.toggleDetailModal(item);
          }}
        />
      );
    }
  }

  toggleDetailModal(item) {
    this.setState({
      item,
      detailModalVisibility: !this.state.detailModalVisibility,
    });
  }

  renderSaleItem = ({item}) => (
    <HistoryDetailItem tag={item.tag} error={item.error} status={item.status} />
  );

  /**
   * @name refresh
   * @description refresh history
   * @return { Void }
   */
  refresh() {
    this.props.loadHistory();
  }

  /**
   * @name historyRefreshing
   * @description history refreshing control
   * @return { boolean }
   */
  get historyRefreshing() {
    const {refresh} = this.props;

    if (refresh && refresh.data) {
      return refresh.data;
    }
    return false;
  }

  paginate() {}

  render() {
    const {history} = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          data={history && history.data}
          extraData={this.props}
          keyExtractor={(item) => item.saleId}
          renderItem={this.renderHistoryItem.bind(this)}
          refreshing={this.historyRefreshing}
          onRefresh={this.refresh.bind(this)}
          onEndReached={this.paginate.bind(this)}
          onEndReachedThreshold={0.01}
          ListEmptyComponent={() => {
            if (history && history.data && history.data.length === 0) {
              return (
                <NoResults image={images.basket} text="Nenhuma venda enviada" />
              );
            } else if (!this.props.connection) {
              return <NoConnection />;
            }

            return null;
          }}
        />
        {this.state.detailModalVisibility && (
          <DetailModal
            title={`Detalhes do ticket ${this.state.item.saleId}`}
            visible={this.state.detailModalVisibility}
            onClose={this.toggleDetailModal.bind(this)}>
            <View style={styles.detailInnerContainer}>
              <Text style={styles.date}>
                Ticket enviado em {this.state.item.date}
              </Text>
              <FlatList
                data={this.state.item.items}
                keyExtractor={(item) => item.tag}
                renderItem={this.renderSaleItem.bind(this)}
              />
            </View>
          </DetailModal>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({history, connection}) => ({
  history,
  connection,
});

const mapDispatchToProps = (dispatch) => ({
  loadHistory(data) {
    dispatch(salesHistoryRequest(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SalesHistory);
