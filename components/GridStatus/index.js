import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

class GridItem extends React.Component {
  static propTypes = {
    icon: PropTypes.string,
    iconColor: PropTypes.string,
    label: PropTypes.string.isRequired,
    style: PropTypes.object,
  };

  render() {
    return (
      <View style={this.props.style || styles.container}>
        {this.props.icon && (
          <Icon
            name={this.props.icon}
            color={this.props.iconColor || 'gold'}
            style={styles.icon}
          />
        )}
        {this.props.label && (
          <Text style={styles.label}>{this.props.label}</Text>
        )}
      </View>
    );
  }
}

export default GridItem;
