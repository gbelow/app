import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';

import {Touch} from 'react-native-kin-ui';

import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../const/theme';
import styles from './styles';

class Button extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    icon: PropTypes.string,
    disabled: PropTypes.bool,
    onPress: PropTypes.func,
    backgroundColor: PropTypes.string,
  };

  static defaultProps = {
    disabled: false,
    backgroundColor: theme.yellowLight,
  };

  /**
   * @name containerStyles
   * @description get container styles
   * @return {Object}
   * */
  get containerStyles() {
    const containerClass = [styles.container];

    if (this.props.backgroundColor) {
      containerClass.push({
        backgroundColor: this.props.backgroundColor,
      });
    }

    if (this.props.disabled) {
      containerClass.push(styles.containerDisabled);
    }

    return containerClass;
  }

  /**
   * @name onPress
   * @name callback when user press in the button
   * @return {Void}
   * */
  onPress() {
    if (this.props.onPress && !this.props.disabled) {
      this.props.onPress();
    }
  }

  render() {
    return (
      <Touch onPress={this.onPress.bind(this)}>
        <View style={this.containerStyles}>
          {this.props.icon && (
            <Icon name={this.props.icon} style={styles.icon} />
          )}
          {this.props.label && (
            <Text style={styles.label}>{this.props.label.toUpperCase()}</Text>
          )}
        </View>
      </Touch>
    );
  }
}

export default Button;
