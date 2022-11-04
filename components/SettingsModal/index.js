import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Modal, Linking, TouchableOpacity} from 'react-native';

import {TextLink, FormInput} from '../../config/components';

import {appId} from '../../package.json';
import styles from './styles';

class SettingsModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    appId,
    port: '3000',
  };

  componentDidMount() {
    const {settings} = this.props;

    if (settings.data) {
      this.setState({
        appId: settings.data.appId,
        port: settings.data.port,
      });
    }
  }

  handleSubmit = () => {
    this.props.onSubmit({
      appId: this.state.appId,
      port: this.state.port,
    });
  };

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={this.props.onClose}>
        <TouchableOpacity
          style={styles.container}
          activeOpacity={1}
          onPress={this.props.onClose}>
          <View style={styles.inner}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Configurações</Text>
            </View>
            <FormInput
              iconRightName="android"
              autoCapitalize="none"
              value={this.state.appId}
              placeholder="Id do app"
              ref="appId"
              reference="appId"
              returnKeyType="done"
              onChangeText={(appId) => this.setState({appId})}
            />
            <FormInput
              iconRightName="globe"
              autoCapitalize="none"
              value={this.state.port}
              placeholder="Porta"
              ref="port"
              reference="port"
              returnKeyType="done"
              onChangeText={(port) => this.setState({port})}
            />
            <View style={styles.closeButtonContainer}>
              <TextLink onPress={this.handleSubmit} text="Confirmar" />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

export default SettingsModal;
