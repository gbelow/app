import React from 'react';
import {connect} from 'react-redux';

import {View, Text, Image, FlatList} from 'react-native';

import {
  ActionHistoryItem,
  DetailModal,
  NoResults,
  NoConnection,
  Grid,
  GridItem,
} from '../../config/components';

import {actionsHistoryRequest} from '../../actions/historyActions';

import images from '../../const/images';
import styles from './styles';

class History extends React.Component {
  static navigationOptions = () => ({
    title: 'Ações',
    headerRight: <View />,
  });

  state = {
    item: null,
    detailModalVisibility: false,
  };

  componentDidMount() {
    this.props.loadHistory();
  }

  /**
   * @name toggleDetailModal
   * @description controls detail modal visibility
   * @return { Void }
   */
  toggleDetailModal(item) {
    this.setState({
      item,
      detailModalVisibility: !this.state.detailModalVisibility,
    });
  }

  /**
   * @name renderHistoryItem
   * @description render history item
   * @return { React.Component }
   */
  renderHistoryItem({item}) {
    return (
      <ActionHistoryItem
        title={item.title}
        startDate={item.startDate}
        endDate={item.endDate}
        toggleDetailModal={() => {
          this.toggleDetailModal(item);
        }}
      />
    );
  }

  /**
   * @name renderCupomItem
   * @description render cupom item
   * @return { React.Component }
   */
  renderCupomItem = ({item}) => {
    return (
      <Grid>
        <Image source={images.coupon} style={styles.detailItemImage} />
        <GridItem label="Número" value={item.number} />
        <GridItem label="Data" value={item.date} />
      </Grid>
    );
  };

  /**
   * @name renderPrizeItem
   * @description render prize item
   * @return { React.Component }
   */
  renderPrizeItem = ({item}) => (
    <Grid>
      <Image source={images.prize} style={styles.detailItemImage} />
      <GridItem label="Prêmio" value={item.product.description} />
    </Grid>
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

  render() {
    const {actionsHistory} = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          data={actionsHistory && actionsHistory.data}
          extraData={this.props}
          keyExtractor={(item) => item.actionId}
          renderItem={this.renderHistoryItem.bind(this)}
          refreshing={this.historyRefreshing}
          onRefresh={this.refresh.bind(this)}
          ListEmptyComponent={() => {
            if (actionsHistory.data && actionsHistory.data.length === 0) {
              return (
                <NoResults
                  image={images.action}
                  text="Nenhuma campanha foi finalizada até o momento"
                />
              );
            } else if (!this.props.connection) {
              return <NoConnection />;
            }

            return null;
          }}
        />
        {this.state.detailModalVisibility && (
          <DetailModal
            title={this.state.item.title}
            visible={this.state.detailModalVisibility}
            onClose={this.toggleDetailModal.bind(this)}>
            {this.state.item.type === 'loteria' && (
              <View>
                <View style={styles.drawnCouponsContainer}>
                  <Text style={styles.description}>
                    Cupons premiados na ação realizada no período de{' '}
                    {this.state.item.startDate} a {this.state.item.endDate}:
                  </Text>
                  <FlatList
                    data={this.state.item.drawnCoupons}
                    keyExtractor={(item, index) => index}
                    renderItem={this.renderCupomItem.bind(this)}
                    ListEmptyComponent={() => {
                      if (
                        this.state.item.drawnCoupons &&
                        this.state.item.drawnCoupons.length === 0
                      ) {
                        return (
                          <NoResults
                            image={images.coupon}
                            text="Nenhum cupom premiado"
                          />
                        );
                      } else if (!this.props.connection) {
                        return <NoConnection />;
                      }

                      return null;
                    }}
                  />
                </View>
                {this.state.item.coupons && this.state.item.coupons.length > 0 && (
                  <View style={styles.userCouponsContainer}>
                    <Text style={styles.description}>
                      Os cupons que você adquiriu ao longo da campanha foram:
                    </Text>
                    <FlatList
                      data={this.state.item.coupons}
                      keyExtractor={(item, index) => index}
                      renderItem={this.renderCupomItem.bind(this)}
                    />
                  </View>
                )}
              </View>
            )}
            {this.state.item.type === 'raspadinha' && (
              <View>
                <Text style={styles.description}>
                  Abaixo estão seus prêmios conquistados na ação realizada no
                  período de {this.state.item.startDate} a{' '}
                  {this.state.item.endDate}.
                </Text>
                <FlatList
                  data={this.state.item.prizes}
                  keyExtractor={(item) => item.level}
                  renderItem={this.renderPrizeItem.bind(this)}
                />
              </View>
            )}
          </DetailModal>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({actionsHistory, connection}) => ({
  actionsHistory,
  connection,
});

const mapDispatchToProps = (dispatch) => ({
  loadHistory() {
    dispatch(actionsHistoryRequest());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(History);
