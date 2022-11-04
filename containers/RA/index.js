'use strict';

import React, {Component} from 'react';

import {View, Text} from 'react-native';

import {Touch} from 'react-native-kin-ui';

// import {
//   ViroVRSceneNavigator,
//   ViroARSceneNavigator,
// } from 'react-viro';

var apiKey = 'EE9D157A-B96D-4BCE-9760-A470BE09F549';

import styles from './styles';

class RA extends React.Component {
  static navigationOptions = ({navigation}) => ({
    header: null,
  });

  state = {
    videoVisible: true,
  };

  finish() {
    this.setState({
      videoVisible: false,
    });

    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {/*<ViroARSceneNavigator
          initialScene={{
            scene: require('./RAScene.js'),
          }}
          viroAppProps={this.state}
          apiKey={apiKey}
        />
        <Touch onPress={() => this.finish()}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>
              Finalizar
            </Text>
          </View>
        </Touch>*/}
      </View>
    );
  }
}

export default RA;
