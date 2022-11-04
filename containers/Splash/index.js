import React from 'react';
import {View, StatusBar} from 'react-native';

import styles from './styles';

class Splash extends React.Component {
  render = () => (
    <View style={styles.container}>
      <StatusBar hidden={true} />
    </View>
  );
}

export default Splash;
