import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import {Touch} from 'react-native-kin-ui';

import theme from '../../const/theme';
import styles from './styles';

class HeaderButton extends React.Component {
  static propTypes = {
    onPress: PropTypes.func,    
  };

  render() {
    return (
      <View>
        <Touch onPress={this.onPress.bind(this)} type="TouchWithoutFeedback">
          <View style={this.containerStyles}>
            {this.props.icon && (
              <View style={styles.iconContainer}>
                <Icon
                  name={this.props.icon}
                  size={theme.headerIconSize}
                  color={theme.headerTintColor}
                  style={this.props.iconStyle}
                />
              </View>
            )}
            {this.props.label && (
              <View
                style={[this.props.labelStyleContainer, styles.labelContainer]}>
                <Text style={[styles.label, this.props.labelStyle]}>
                  {this.props.label}
                </Text>
              </View>
            )}
          </View>
        </Touch>
      </View>
    );
  }

  /**
   * @name containerStyles
   * @description return container styles
   * @return {Void}
   * */
  get containerStyles() {
    const containerStyles = [styles.container];

    if (this.props.style) {
      containerStyles.push(this.props.style);
    }

    return containerStyles;
  }

  /**
   * @name onPress
   * @description callback when user press on button
   * @return {Void}
   * */
  onPress() {
    if (this.props.navigation) {
      if (this.props.routeName) {
        this.props.navigation.navigate(this.props.routeName, this.props.params);
      } else if (this.props.back) {
        this.props.navigation.goBack();
      }
    } else if (this.props.onPress) {
      this.props.onPress();
    }
  }
}

HeaderButton.propTypes = {
  navigation: PropTypes.any,
  routeName: PropTypes.string,
  back: PropTypes.bool,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  icon: PropTypes.string,
  style: PropTypes.any,
  innerStyle: PropTypes.any,
  iconStyle: PropTypes.any,
  labelStyle: PropTypes.any,
  labelStyleContainer: PropTypes.any,
  params: PropTypes.any,
};

HeaderButton.defaultProps = {
  style: {},
  innerStyle: {},
  back: false,
  iconStyle: {},
  params: {},
};

export default HeaderButton;
