import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';

import styles from './styles';

class NavigationBar extends React.Component {
  static propTypes = {
    left: PropTypes.node,
    center: PropTypes.node,
    right: PropTypes.node,
    statusBarBackground: PropTypes.string,
    title: PropTypes.string,
  };

  static defaultProps = {
    statusBarBackground: 'transparent',
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inner}>
          <View style={styles.left}>{this.props.left}</View>
          <View style={styles.center}>
            {this.props.title && (
              <Text style={styles.title}>{this.props.title}</Text>
            )}
            {this.props.center && !this.props.title && (
              <View>{this.props.center}</View>
            )}
          </View>
          <View style={styles.right}>{this.props.right}</View>
        </View>
      </View>
    );
  }
}

export default NavigationBar;
