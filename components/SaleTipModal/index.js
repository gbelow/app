import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Modal, FlatList, Image} from 'react-native';

import {
  NavigationBar,
  NoResults,
  NoConnection,
  TextLink,
} from '../../config/components';

import images from '../../const/images';
import styles from './styles';

class SaleTipModal extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
  };

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={this.props.onClose}>
        <View style={styles.inner}>
          <Image source={images.saleTip} style={styles.saleTip} />
          <View style={styles.buttonContainer}>
            <TextLink onPress={this.props.onClose} text="Fechar" />
          </View>
        </View>
      </Modal>
    );
  }
}

export default SaleTipModal;
