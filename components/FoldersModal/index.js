import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Modal,
  Image,
  Linking,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import {TextLink, FormInput} from '../../config/components';

import theme from '../../const/theme';
import styles from './styles';

class FoldersModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  renderItem({item}) {
    const {nomeDiretorio} = item;

    return (
      <TouchableOpacity onPress={() => this.props.selectFolder(nomeDiretorio)}>
        <View style={styles.folderContainer}>
          <Text style={styles.folderName}>{nomeDiretorio}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const {folders} = this.props;

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={this.props.onClose}>
        <TouchableOpacity
          style={styles.container}
          activeOpacity={1}
          onPress={this.props.onClose}>
          <View style={styles.inner}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Selecione uma pasta</Text>
            </View>
            <FlatList
              data={folders}
              renderItem={this.renderItem.bind(this)}
              keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.closeButtonContainer}>
              <TextLink onPress={this.props.onClose} text="fechar" />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

export default FoldersModal;
