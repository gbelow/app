import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Modal, Image, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {TextLink} from '../../config/components';

import styles from './styles';

class DetailModal extends React.Component {
  static propTypes = {
    image: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    title: PropTypes.string,
    icon: PropTypes.string,
    iconColor: PropTypes.string,
    children: PropTypes.node,
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
              {this.props.image && (
                <Image source={this.props.image} style={styles.image} />
              )}
              {this.props.icon && (
                <Icon
                  name={this.props.icon}
                  size={20}
                  color={this.props.iconColor}
                />
              )}
              <Text style={styles.title}>{this.props.title}</Text>
            </View>
            <View style={styles.dataContainer}>{this.props.children}</View>
            <View style={styles.closeButtonContainer}>
              <TextLink onPress={this.props.onClose} text="Fechar" />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

export default DetailModal;
