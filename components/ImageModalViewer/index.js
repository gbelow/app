import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Modal, Button} from 'react-native';

import {TextLink} from '../../config/components';

import ImageViewer from 'react-native-image-zoom-viewer';
import theme from '../../const/theme';
import styles from './styles';

class ImageModalViewer extends React.Component {
  static propTypes = {
    imageUrls: PropTypes.array,
    visible: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Modal
        transparent={true}
        visible={this.props.visible}
        onRequestClose={this.props.onClose}>
        {this.props.imageUrls && this.props.imageUrls.length && (
          <ImageViewer imageUrls={this.props.imageUrls} />
        )}
        <View style={styles.footer}>
          <Button
            title="Fechar"
            color={theme.yellowLight}
            onPress={this.props.onClose}
          />
        </View>
      </Modal>
    );
  }
}

export default ImageModalViewer;
