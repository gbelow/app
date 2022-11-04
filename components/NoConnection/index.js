import React from 'react';
import {View, Text} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

class NoConnection extends React.Component {
  render = () => (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="cloud" style={styles.icon} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Você está sem conexão.</Text>
      </View>
    </View>
  );
}

export default NoConnection;
