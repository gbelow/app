import React from 'react';
import PropTypes from 'prop-types';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

import styles from './styles';

class Activity extends React.Component {
  render() {
    const {show} = this.props;

    if (!show) {
      return <View />;
    }

    return (
      <View style={styles.container}>
        <ActivityIndicator
          animating={true}
          color="#FFF"
          style={[styles.centering, {height: 80}]}
          size="large"
        />
      </View>
    );
  }
}

Activity.PropTypes = {
  show: PropTypes.boolean,
};

Activity.defaultProps = {
  show: false,
};

export default Activity;
