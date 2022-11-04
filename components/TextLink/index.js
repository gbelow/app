import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, TouchableOpacity} from 'react-native';

import styles from './styles';

class TextLink extends React.Component {
  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string.isRequired,
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.onPress}>
          <Text style={this.props.styles || styles.text}>
            {this.props.text.toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default TextLink;
