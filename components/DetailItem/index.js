import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';

import styles from './styles';

class DetailItem extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{this.props.label}</Text>
        <Text style={styles.value}>{this.props.value}</Text>
      </View>
    );
  }
}

export default DetailItem;
