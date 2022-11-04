import React from 'react';
import PropTypes from 'prop-types';
import {View, Image} from 'react-native';

import {Grid, GridItem} from '../../config/components';

import images from '../../const/images';
import styles from './styles';

class DevolutionHistoryItem extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    date: PropTypes.string,
    items: PropTypes.array,
    status: PropTypes.string,
    toggleDetailModal: PropTypes.func.isRequired,
  };

  render() {
    return (
      <View style={styles.container}>
        <Grid onPress={this.props.toggleDetailModal}>
          <Image source={images.devolution} style={styles.ticketImage} />
          <GridItem
            label="Devolução"
            value={this.props.id}
            style={styles.ticketIdContainer}
          />
          <GridItem label="Data" value={this.props.date} />
        </Grid>
      </View>
    );
  }
}

export default DevolutionHistoryItem;
