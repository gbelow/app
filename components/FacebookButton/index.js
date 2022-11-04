import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';

import {Touch} from 'react-native-kin-ui';

import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../const/theme';
import styles from './styles';

class FacebookButton extends React.Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Touch onPress={this.props.onPress}>
        <View style={styles.container}>
          <Icon name="facebook-square" style={styles.icon} />
          <Text style={styles.buttonText}>Entrar com Facebook</Text>
        </View>
      </Touch>
    );
  }
}

export default FacebookButton;
