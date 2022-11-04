import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';

import {Touch} from 'react-native-kin-ui';

import styles from './styles';

class Home extends React.Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    image: PropTypes.string,
    label: PropTypes.string.isRequired,
    onPress: PropTypes.func,
  };

  render() {
    const {value, label, onPress} = this.props;

    return (
      <View style={styles.container}>
        <Touch onPress={onPress}>
          <View style={styles.inner}>
            <Image source={this.props.image} style={styles.icon} />
            <Text style={styles.value}>{value}</Text>
            <Text style={styles.label}>{label.toUpperCase()}</Text>
          </View>
        </Touch>
      </View>
    );
  }
}

export default Home;
