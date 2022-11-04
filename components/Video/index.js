import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import VideoPlayer from 'react-native-video-controls';
import VideoPlayerYouTube from 'react-native-youtube';
import Orientation from 'react-native-orientation-locker';

import styles from './styles';

class Video extends React.Component {
  static propTypes = {
    source: PropTypes.string.isRequired,
    thumb: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      fullScreen: false,
    };
  }

  componentWillUnmount() {
    Orientation.lockToPortrait();
  }

  isYoutubeVideo(source) {
    const isYoutube = /youtube/.test(source);

    if (isYoutube) {
      return true;
    }

    return false;
  }

  getVideoId(source) {
    const videoId = source.split('v=')[1];
    const ampersand = videoId.indexOf('&');

    if (ampersand !== -1) {
      return videoId.substring(0, ampersand);
    }

    return videoId;
  }

  componentDidUpdate() {
    const {fullScreen} = this.state;

    if (fullScreen) {
      Orientation.lockToLandscape();
      return;
    }

    Orientation.lockToPortrait();
  }

  toggleFullScreenAndroid() {
    const {fullScreen} = this.state;

    this.setState({
      ...this.state,
      fullScreen: !fullScreen,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {this.isYoutubeVideo(this.props.source) ? (
          <VideoPlayerYouTube
            apiKey="API-KEY-ID"
            videoId={this.getVideoId(this.props.source)}
            controls={1}
            rel={false}
            fullscreen={this.state.fullScreen}
            onChangeFullscreen={() => this.toggleFullScreenAndroid()}
            showFullscreenButton={true}
            style={this.props.style}
          />
        ) : (
          <VideoPlayer
            source={{uri: this.props.source}}
            style={this.props.style}
            disableBack={true}
            resizeMode="cover"
            posterResizeMode="cover"
            poster={this.props.thumb}
            paused={true}
            toggleResizeModeOnFullscreen={true}
            fullscreenAutorotate={true}
            fullscreenOrientation="landscape"
            doubleTapTime={300}
            tapAnywhereToPause={true}
            onEnterFullscreen={() => this.toggleFullScreenAndroid()}
            onExitFullscreen={() => this.toggleFullScreenAndroid()}
          />
        )}
      </View>
    );
  }
}

export default Video;
