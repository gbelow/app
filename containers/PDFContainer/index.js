import React from 'react';
import {View, Image, Alert, Linking, TouchableOpacity} from 'react-native';

import {WebView} from 'react-native-webview';
import Pdf from 'react-native-pdf';
import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

class WebContainer extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title,
    headerRight: (
      <TouchableOpacity
        style={styles.shareButton}
        onPress={() => {
          Share.open({
            title: navigation.state.params.title,
            url: navigation.state.params.url,
          });
        }}>
        <View style={styles.instructions}>
          <Icon name="share-alt" style={styles.shareIcon} />
        </View>
      </TouchableOpacity>
    ),
  });

  state = {
    uri: null,
  };

  componentDidMount() {
    this.setState({
      uri: this.props.navigation.state.params.url,
    });
  }

  render() {
    const {uri} = this.state;

    if (uri) {
      return <Pdf source={{uri}} style={styles.pdf} />;
    } else {
      return <View />;
    }
  }
}

export default WebContainer;
