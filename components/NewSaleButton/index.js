import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';

import {Touch} from 'react-native-kin-ui';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

class NewSaleButton extends React.Component {
  static propTypes = {
    radius: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
  };

  static defaultProps = {
    radius: false,
  };

  get style() {
    const style = [styles.container];

    if (this.props.radius) {
      style.push(styles.containerRadius);
    }

    return style;
  }

  render() {
    return (
      <Touch onPress={this.props.onPress}>
        <View style={this.style}>
          <Icon name="tags" style={styles.icon} />
          <Text style={styles.label}>NOVA VENDA</Text>
        </View>
      </Touch>
    );
  }
}

export default NewSaleButton;
