import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {View, FlatList} from 'react-native';

import {
  Title,
  Grid,
  GridItem,
  GridStatus,
  DetailItem,
  DetailModal,
} from '../../config/components';

import styles from './styles';

class UserPrizes extends React.Component {
  static propTypes = {
    prizes: PropTypes.object,
  };

  state = {
    item: null,
    detailModalVisibility: false,
  };

  /**
   * @name toggleDetailModal
   * @description change DetailModal visibility
   * @param {Object} item
   * @return {Void}
   */
  toggleDetailModal(item) {
    const {detailModalVisibility} = this.state;

    this.setState({
      item,
      detailModalVisibility: !detailModalVisibility,
    });
  }

  /**
   * @name renderItem
   * @description return item from user prizes list
   * @param {Object} item
   * @return {React.Component} Grid with children
   */
  renderItem({item}) {
    if (item.status !== 'New') {
      return (
        <Grid onPress={this.toggleDetailModal.bind(this, item)}>
          <GridItem label="Prêmio" value={item.prize} />
          <GridItem label="Data" value={item.date} />
          <GridStatus label={item.status} />
        </Grid>
      );
    }
  }

  /**
   * @name extractKey
   * @description extract prize id
   * @param {Object} item
   * @return {Number}
   */
  extractKey = (item) => item.id;

  render() {
    return (
      <View style={styles.container}>
        <Title title="Seus prêmios já conquistados" />
        <FlatList
          data={this.props.prizes.data}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={this.extractKey.bind(this)}
          style={styles.container}
        />
        {this.state.item && (
          <DetailModal
            title={this.state.item.prize}
            icon="gift"
            iconColor="red"
            visible={this.state.detailModalVisibility}
            onClose={this.toggleDetailModal.bind(this)}>
            <DetailItem label="Prêmio" value={this.state.item.prize} />
            <DetailItem label="Data" value={this.state.item.date} />
            <DetailItem label="Status" value={this.state.item.status} />
          </DetailModal>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({prizes}) => ({
  prizes,
});

export default connect(mapStateToProps)(UserPrizes);
