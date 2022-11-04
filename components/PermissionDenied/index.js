import React from 'react';
import PropTypes from 'prop-types';

import {View, Text, Platform, Alert, Linking} from 'react-native';

import {Touch} from 'react-native-kin-ui';

import styles from './styles';

class PermissionDenied extends React.Component {
  static propTypes = {
    style: PropTypes.any,
    title: PropTypes.string.isRequired,
    titleStyle: PropTypes.any,
    message: PropTypes.string.isRequired,
    messageStyle: PropTypes.any,
    link: PropTypes.string.isRequired,
    linkStyle: PropTypes.any,
    alertErrorTitle: PropTypes.string.isRequired,
    alertErrorMessage: PropTypes.string.isRequired,
    alertOkText: PropTypes.string.isRequired,
    onLinkPress: PropTypes.func,
    navigation: PropTypes.object.isRequired,
  };

  static defaultProps = {
    alertErrorTitle: 'Atenção',
    alertErrorMessage:
      'Para utilizar a câmera você deve habilitar o acesso à mesma nas preferências do seu dispositivo, dentro de configurações.',
    alertOkText: 'Entendi',
  };

  /**
   * @name onLinkPress
   * @description callback when user press on the link
   * @return {Any}
   * */
  onLinkPress() {
    if (this.props.onLinkPress) {
      return this.props.onLinkPress();
    }

    Platform.select({
      ios: () => {
        Linking.openURL('app-settings:');
      },
      android: () => {
        Alert.alert(this.props.alertErrorTitle, this.props.alertErrorMessage, [
          {
            text: this.props.alertOkText,
            onPress: () => this.props.navigation.goBack(),
          },
        ]);
      },
    })();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inner}>
          <Text style={[styles.titleText, this.props.titleStyle]}>
            {this.props.title}
          </Text>
          <Text style={[styles.messageText, this.props.messageStyle]}>
            {this.props.message}
          </Text>
          <View style={styles.linkContainer}>
            <Touch onPress={this.onLinkPress.bind(this)}>
              <Text style={[styles.linkText, this.props.linkStyle]}>
                {this.props.link}
              </Text>
            </Touch>
          </View>
        </View>
      </View>
    );
  }
}

export default PermissionDenied;
