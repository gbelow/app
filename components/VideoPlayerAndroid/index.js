import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Alert, Image, Modal, TouchableOpacity} from 'react-native';

import {Touch} from 'react-native-kin-ui';

import VideoPlayer from 'react-native-video-player';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TextLink} from '../../config/components';

import images from '../../const/images';
import styles from './styles';

class VideoPlayerAndroid extends React.Component {
  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={this.props.onClose}>
        <View style={styles.container}>
          <VideoPlayer
            video={{uri: this.props.source}}
            thumbnail={{uri: this.props.thumb}}
            endWithThumbnail
            fullScreenOnLongPress
            resizeMode="cover"
            autoplay
            style={styles.video}
          />
        </View>
      </Modal>
    );
  }
}

export default VideoPlayerAndroid;
