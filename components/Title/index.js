import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';

import styles from './styles';

class Title extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    uppercase: PropTypes.bool,
  };

  get title() {
    return this.props.uppercase
      ? this.props.title.toUpperCase()
      : this.props.title;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.title}</Text>
        {this.props.subtitle && (
          <Text style={styles.subtitle}>{this.props.subtitle}</Text>
        )}
      </View>
    );
  }
}

export default Title;
