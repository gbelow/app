import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

import {View, Text, Image} from 'react-native';

import styles from './styles';

class NoResults extends React.Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
      'dark',
      'white',
      'info',
      'danger',
      'warning',
      'success',
    ]),
    iconStyle: PropTypes.any,
    textStyle: PropTypes.any,
    image: PropTypes.number,
  };

  static defaultProps = {
    icon: 'info-circle',
    text: 'Nenhum resultado encontrado',
    type: 'dark',
    iconStyle: {},
    textStyle: {},
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          {this.props.icon && !this.props.image && (
            <Icon
              name={this.props.icon}
              style={[
                styles.icon,
                styles[this.props.type],
                this.props.iconStyle,
              ]}
            />
          )}
          {this.props.image && (
            <Image source={this.props.image} style={styles.image} />
          )}
        </View>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.text,
              styles[(this.props.type, this.props.textStyle)],
            ]}>
            {this.props.text}
          </Text>
        </View>
      </View>
    );
  }
}

export default NoResults;
