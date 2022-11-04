import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import {Touch} from 'react-native-kin-ui';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

class PictureBox extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,
    handleTakePicture: PropTypes.func,
    handleRemovePicture: PropTypes.func,
  };

  render() {
    const {title, image, handleTakePicture, handleRemovePicture} = this.props;

    return (
      <View style={styles.container}>
        {!image && (
          <Touch onPress={() => handleTakePicture()}>
            <Icon name="camera" style={styles.photoIcon} />
            <Text style={styles.description}>{title}</Text>
          </Touch>
        )}
        {image && (
          <View>
            <Image style={styles.preview} source={{uri: image}} />
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => handleRemovePicture()}>
              <Icon name="close" style={styles.cancelIcon} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

export default PictureBox;
