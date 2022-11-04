import React from 'react';
import {View, Text, Modal} from 'react-native';
import PropTypes from 'prop-types';

import {TextLink} from '../../config/components';

import styles from './styles';

class ConfirmModal extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    buttonLabel: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={this.props.onClose}>
        <View
          style={styles.container}
          activeOpacity={1}
          onPress={this.props.onClose}>
          <View style={styles.inner}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{this.props.title}</Text>
            </View>
            <Text style={styles.description}>{this.props.description}</Text>
            <View style={styles.buttonsContainer}>
              <View style={styles.confirmButtonContainer}>
                <TextLink
                  onPress={this.props.onConfirm}
                  text={this.props.buttonLabel}
                  uppercase={true}
                  styles={styles.textConfirmButton}
                />
              </View>
              <View style={styles.closeButtonContainer}>
                <TextLink onPress={this.props.onClose} text="Fechar" />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default ConfirmModal;
