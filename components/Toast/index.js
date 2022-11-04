import React from 'react';
import PropTypes from 'prop-types';
import {Animated, View, Text} from 'react-native';

import {Touch} from 'react-native-kin-ui';

import styles from './styles';

class Toast extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    messageTextStyle: PropTypes.object,
    closeTextStyle: PropTypes.object,
    position: PropTypes.string,
    duration: PropTypes.number,
    message: PropTypes.string.isRequired,
    showCloseButton: PropTypes.bool,
    closeButtonText: PropTypes.string,
    onCloseButtonPress: PropTypes.func,
  };

  static defaultProps = {
    style: {},
    messageTextStyle: {},
    closeTextStyle: {},
    position: 'top',
    showCloseButton: true,
    closeButtonText: 'Ok',
  };

  state = {
    show: true,
    positionAnimation: new Animated.Value(0),
  };

  componentDidMount() {
    if (this.props.duration) {
      setTimeout(this.hide.bind(this), parseInt(this.props.duration, 10));
    }
  }

  hide() {
    this.setState({show: false});
  }

  /**
   * @name onCloseButtonPress
   * @description
   * @return {Any}
   * */
  onCloseButtonPress() {
    if (this.props.onCloseButtonPress) {
      return this.props.onCloseButtonPress();
    }

    this.hide();
  }

  /**
   * @name containerPosition
   * @description get container style based on toast position
   * @return {String}
   * */
  get containerPosition() {
    const {position} = this.props;

    if (position === 'top') {
      return styles.containerPositionTop;
    }

    if (position === 'bottom') {
      return styles.containerPositionBottom;
    }

    if (position === 'middle') {
      return styles.containerPositionMiddle;
    }
  }

  get containerStyle() {
    const container = [
      styles.container,
      this.props.style,
      this.containerPosition,
    ];
    return container;
  }

  render() {
    if (!this.state.show) {
      return null;
    }

    return (
      <View style={this.containerStyle}>
        <View style={styles.inner}>
          <View style={styles.messageContainer}>
            <Text
              style={[styles.messageText].concat(this.props.messageTextStyle)}>
              {this.props.message}
            </Text>
          </View>
          <View style={styles.closeContainer}>
            <Touch onPress={this.onCloseButtonPress.bind(this)}>
              <Text
                style={[styles.closeText].concat(this.props.closeTextStyle)}>
                {this.props.closeButtonText}
              </Text>
            </Touch>
          </View>
        </View>
      </View>
    );
  }
}

export default Toast;
