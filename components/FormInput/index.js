import React from 'react';
import PropTypes from 'prop-types';
import {View, TextInput} from 'react-native';

const StringMask = require('string-mask');

import {Touch} from 'react-native-kin-ui';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

class FormInput extends React.Component {
  state = {
    value: '',
  };

  static propTypes = {
    onChangeText: PropTypes.func,
    disabled: PropTypes.bool,
    mask: PropTypes.string,
    iconRightName: PropTypes.string,
    iconRightStyle: PropTypes.any,
    iconRightPress: PropTypes.func,
    iconLeftName: PropTypes.string, // TODO
    iconLeftStyle: PropTypes.any, // TODO
    iconLeftPress: PropTypes.func, // TODO
  };

  static defaultProps = {
    disabled: false,
    underlineColorAndroid: 'transparent',
  };

  constructor(props) {
    super(props);

    if (props.value) {
      this.state = {
        value: props.value,
      };
    }

    if (props.mask) {
      this.maskFormatter = new StringMask(props.mask);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.value &&
      (!this.state.value || this.state.value.length < nextProps.value.length) &&
      this.props.mask &&
      this.maskFormatter &&
      nextProps.value
    ) {
      this.setState({
        value: this.maskFormatter.apply(
          nextProps.value.replace(
            /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi,
            '',
          ),
        ),
      });
    } else {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  /**
   * @name containerStyles
   * @description callback when user press on icon
   * @return {Array}
   **/
  get containerStyles() {
    let containerStyles = [styles.container];

    if (this.props.iconRightName) {
      containerStyles.push(styles.inputWithIconRight);
    }

    return containerStyles;
  }

  /**
   * @name iconPressProxy
   * @description callback when user press on icon
   * @param {String} right position of the icon
   * @return {Void}
   **/
  iconPressProxy(method = 'right') {
    if (this.props[method]) {
      this.props[method]();
    }
  }

  /**
   * @name onChangeText
   * @description callback when change text
   * @param {String} value
   * @return {Void}
   **/
  onChangeText(value) {
    if (value && this.state.value) {
      if (value.length >= this.state.value.length) {
        if (this.props.mask && this.maskFormatter) {
          value = this.maskFormatter.apply(
            value.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''),
          );
        }
      }
    }

    this.setState({value});

    if (this.props.onChangeText) {
      this.props.onChangeText(value);
    }

    if (this.props.maxLength && this.props.onSubmitEditing) {
      if (value && value.length === this.props.maxLength) {
        this.props.onSubmitEditing();
      }
    }
  }

  /**
   * @name focus
   * @description enable focus on field
   * @return {Void}
   **/
  focus() {
    this.refs.input.focus();
  }

  blur() {
    this.refs.input.blur();
  }

  // Value

  render() {
    return (
      <View style={this.containerStyles}>
        <TextInput
          {...this.props}
          ref="input"
          value={this.state.value}
          editable={!this.props.disabled}
          style={[styles.input, this.props.style]}
          onChangeText={this.onChangeText.bind(this)}
        />
        {this.props.iconRightName && (
          <View style={styles.iconRightContainer}>
            <Touch onPress={this.iconPressProxy.bind(this, 'onIconRightPress')}>
              <Icon
                name={this.props.iconRightName}
                style={[styles.iconRight, this.props.iconRightStyle]}
              />
            </Touch>
          </View>
        )}
      </View>
    );
  }
}

export default FormInput;
