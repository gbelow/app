import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';

import styles from './styles';

class DrawerAvatar extends React.Component {
  static propTypes = {
    avatar: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri: this.props.avatar,
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{this.props.name}</Text>
      </View>
    );
  }
}

export default DrawerAvatar;
