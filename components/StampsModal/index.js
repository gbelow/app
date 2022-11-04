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

class StampsModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  renderItem({item}) {
    return (
      <TouchableOpacity onPress={() => this.props.selectStamp(item)}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: item.location}}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const {stamps, sex, color} = this.props;
    const {whiteDarken, blackLight} = theme;
    const sexIndex = sex === 'female' ? 'fem' : 'masc';
    const colorIndex = color === 'white' ? 'branco' : 'escuro';

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
          <View
            style={[
              styles.inner,
              {backgroundColor: color === 'white' ? whiteDarken : blackLight},
            ]}>
            <View style={styles.titleContainer}>
              <Text
                style={[
                  styles.title,
                  {color: color === 'white' ? blackLight : whiteDarken},
                ]}>
                Selecione uma estampa
              </Text>
            </View>
            {stamps && (
              <FlatList
                data={stamps[sexIndex][colorIndex]}
                extraData={stamps[sexIndex][colorIndex]}
                renderItem={this.renderItem.bind(this)}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
              />
            )}
            <View style={styles.closeButtonContainer}>
              <TextLink onPress={this.props.onClose} text="fechar" />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

export default StampsModal;
