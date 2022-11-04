import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

class CustomerItem extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    phone: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    email: PropTypes.string,
    cpf: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  state = {
    showInfo: false,
  };

  showInfo() {
    this.setState({
      showInfo: !this.state.showInfo,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.name}>{this.props.name}</Text>
          </View>
          {this.props.phone && (
            <View style={styles.infoRow}>
              <Icon name="phone-square" style={styles.icon} />
              <Text style={styles.infoText}>{this.props.phone}</Text>
            </View>
          )}
          {this.props.email && (
            <View style={styles.infoRow}>
              <Icon name="envelope-square" style={styles.icon} />
              <Text style={styles.infoText}>
                {this.props.email.toLowerCase()}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.selectButtonContainer}>
          <Icon name="angle-right" style={styles.selectButton} />
        </View>
      </View>
    );
  }
}

export default CustomerItem;
