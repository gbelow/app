import React from 'react';
import PropTypes from 'prop-types';
import {View, Image} from 'react-native';

import {Grid, GridItem} from '../../config/components';

import images from '../../const/images';
import styles from './styles';

class ActionHistoryItem extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    toggleDetailModal: PropTypes.func,
  };

  render() {
    return (
      <View style={styles.container}>
        <Grid onPress={this.props.toggleDetailModal}>
          <Image source={images.trophy} style={styles.trophyImage} />
          <GridItem label="Nome" value={this.props.title} />
          <GridItem label="Data de início" value={this.props.startDate} />
          <GridItem label="Data de término" value={this.props.endDate} />
        </Grid>
      </View>
    );
  }
}

export default ActionHistoryItem;
