import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';

import {Touch} from 'react-native-kin-ui';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

class NotificationItem extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    when: PropTypes.string.isRequired,
    read: PropTypes.bool,
  };

  get containerStyle() {
    const containerStyles = [styles.container];

    if (!this.props.read) {
      containerStyles.push(styles.containerNotRead);
    }

    return containerStyles;
  }

  render() {
    return (
      <Touch onPress={this.props.navigate}>
        <View style={this.containerStyle}>
          {/*
            !this.props.read &&
            <View style={styles.notRead} />
          */}
          {/*
            <View style={styles.kindContainer}>
              <View style={styles.kindIconContainer}>
                {!this.props.read &&
                  <Icon
                    name="envelope"
                    style={styles.kindIcon}
                  />
                }
                {this.props.read &&
                  <Icon
                    name="envelope-open"
                    style={styles.kindIcon}
                  />
                }
              </View>
            </View>
          */}
          <View style={styles.infoContainer}>
            <Text style={styles.titleText}>{this.props.title}</Text>
            <View style={styles.whenContainer}>
              <Icon name="clock-o" style={styles.whenIcon} />
              <Text style={styles.whenText}>{this.props.when}</Text>
            </View>
            <Text style={styles.descriptionText}>{this.props.description}</Text>
          </View>
        </View>
      </Touch>
    );
  }
}

export default NotificationItem;
