import React from 'react';
import {connect} from 'react-redux';
import {View, Text, FlatList} from 'react-native';

import {
  DevolutionHistoryItem,
  HistoryDetailItem,
  DetailModal,
  NoResults,
  NoConnection,
} from '../../config/components';

import {devolutionsHistoryRequest} from '../../actions/devolutionActions';

import images from '../../const/images';
import styles from './styles';

class DevolutionsHistory extends React.Component {
  static navigationOptions = () => ({
    title: 'Devoluções',
    headerRight: <View />,
  });

  state = {
    item: null,
    detailModalVisibility: false,
  };

  componentDidMount() {
    this.props.loadHistory();
  }

  renderHistoryItem({item}) {
    return (
      <DevolutionHistoryItem
        id={item.devolutionId}
        date={item.date}
        items={item.items}
        status={item.status}
        toggleDetailModal={() => {
          this.toggleDetailModal(item);
        }}
      />
    );
  }

  toggleDetailModal(item) {
    this.setState({
      item,
      detailModalVisibility: !this.state.detailModalVisibility,
    });
  }

  renderDevolutionItem = ({item}) => (
    <HistoryDetailItem tag={item.tag} error={item.error} />
  );

  /**
   * @name refresh
   * @description refresh devolutionsHistory
   * @return { Void }
   */
  refresh() {
    this.props.loadHistory();
  }

  /**
   * @name historyRefreshing
   * @description devolutionsHistory refreshing control
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
    const {devolutionsHistory} = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          data={devolutionsHistory && devolutionsHistory.data}
          extraData={this.props}
          keyExtractor={(item) => item.devolutionId}
          renderItem={this.renderHistoryItem.bind(this)}
          refreshing={this.historyRefreshing}
          onRefresh={this.refresh.bind(this)}
          ListEmptyComponent={() => {
            if (
              devolutionsHistory &&
              devolutionsHistory.data &&
              devolutionsHistory.data.length === 0
            ) {
              return (
                <NoResults
                  image={images.devolution}
                  text="Nenhuma devolução foi realizada"
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
            title={`Detalhes da devolução ${this.state.item.devolutionId}`}
            visible={this.state.detailModalVisibility}
            onClose={this.toggleDetailModal.bind(this)}
            showItemStatus={false}>
            <Text style={styles.date}>
              Devolução realizada em {this.state.item.date}
            </Text>
            <FlatList
              data={this.state.item.items}
              keyExtractor={(item) => item.tag}
              renderItem={this.renderDevolutionItem.bind(this)}
            />
          </DetailModal>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({devolutionsHistory, connection}) => ({
  devolutionsHistory,
  connection,
});

const mapDispatchToProps = (dispatch) => ({
  loadHistory() {
    dispatch(devolutionsHistoryRequest());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DevolutionsHistory);
