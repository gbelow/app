import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, Image} from 'react-native';

import images from '../../const/images';
import styles from './styles';

class RankingItem extends React.Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    points: PropTypes.number.isRequired,
    position: PropTypes.number.isRequired,
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.positionContainer}>
          <Text
            style={
              this.props.position === 1 ? styles.firstPosition : styles.position
            }>
            {this.props.position}.
          </Text>
        </View>
        {/*
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: `https://graph.facebook.com/${this.props.id}/picture?type=large` }}
              style={styles.avatar}
            />
          </View>
        */}
        <View style={styles.infoContainer}>
          <Text style={styles.nameText}>{this.props.name}</Text>
          <Text style={styles.pointsText}>{this.props.points} pontos</Text>
        </View>
        <View style={styles.detailsContainer}>
          {this.props.position === 1 && (
            <Image source={images.trophy} style={styles.icon} />
          )}
        </View>
      </View>
    );
  }
}

export default RankingItem;
