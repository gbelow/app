import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';

import {Touch} from 'react-native-kin-ui';

import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

class DrawerItem extends React.Component {
  static propTypes = {
    handleMenuAction: PropTypes.func,
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    badge: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.bool,
    ]),
  };

  render() {
    return (
      <Touch onPress={this.props.handleMenuAction}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Icon name={this.props.icon} style={styles.icon} />
          </View>
          <Text style={styles.name}>{this.props.name}</Text>
          {this.props.badge > 0 && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{this.props.badge}</Text>
            </View>
          )}
        </View>
      </Touch>
    );
  }
}

export default DrawerItem;
