import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Modal, Linking, TouchableOpacity} from 'react-native';

import {TextLink} from '../../config/components';

import styles from './styles';

class AlertModal extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    link: PropTypes.string,
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
              <Text style={styles.title}>{this.props.title}</Text>
            </View>
            <Text style={styles.description}>{this.props.description}</Text>
            {this.props.link && (
              <TextLink
                onPress={() => Linking.openURL(this.props.link)}
                text="Apple Mail"
              />
            )}
            <View style={styles.closeButtonContainer}>
              <TextLink onPress={this.props.onClose} text="Fechar" />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

export default AlertModal;
