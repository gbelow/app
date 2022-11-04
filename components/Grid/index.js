import React from 'react';
import PropTypes from 'prop-types';

import {View} from 'react-native';

import {Touch} from 'react-native-kin-ui';

import styles from './styles';

class Grid extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    onPress: PropTypes.func,
  };

  render() {
    return (
      <View style={styles.container}>
        <Touch onPress={this.props.onPress}>
          <View style={styles.innerContainer}>{this.props.children}</View>
        </Touch>
      </View>
    );
  }
}

export default Grid;
