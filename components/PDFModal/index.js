import React from 'react';
import PropTypes from 'prop-types';
import {View, Modal} from 'react-native';

import Pdf from 'react-native-pdf';
import {TextLink} from '../../config/components';
import styles from './styles';

class PDFModal extends React.Component {
  static propTypes = {
    pdf: PropTypes.string,
    visible: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
  };

  render() {
    const {uri} = this.props;

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={this.props.onClose}>
        <View style={styles.container}>
          <View style={styles.inner}>
            <Pdf source={{uri}} style={styles.pdf} />
            <View style={styles.buttonContainer}>
              <TextLink onPress={this.props.onClose} text="Fechar" />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default PDFModal;
