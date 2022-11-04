import React from 'react';
import {connect} from 'react-redux';

import {View, FlatList} from 'react-native';

import {RankingItem, NoResults} from '../../config/components';

import rankingRequest from '../../actions/rankingActions';
import images from '../../const/images';
import styles from './styles';

class Ranking extends React.Component {
  static navigationOptions = () => ({
    title: 'Ranking',
    headerRight: <View />,
  });

  componentDidMount() {
    const {data} = this.props.action;

    this.props.loadRanking(data);
  }

  /**
   * @name renderItem
   * @description return item from ranking list
   * @param {Object} item
   * @return {Component} RankingItem
   */
  renderItem = ({item}) => (
    <RankingItem
      id={item.idUsuario}
      name={item.name}
      points={item.points}
      position={item.position}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        {this.props.ranking && this.props.ranking.data && (
          <FlatList
            data={this.props.ranking.data}
            renderItem={this.renderItem.bind(this)}
            keyExtractor={(item) => item.idUsuario}
            ListEmptyComponent={() => (
              <NoResults image={images.trophy} text="Sem dados no momento" />
            )}
            style={styles.container}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = ({ranking, action}) => ({
  ranking,
  action,
});

const mapDispatchToProps = (dispatch) => ({
  loadRanking(action) {
    dispatch(rankingRequest(action));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
