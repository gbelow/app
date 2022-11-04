import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Alert} from 'react-native';

import {Touch} from 'react-native-kin-ui';

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

  handleCustomerEdition() {
    const {id, name, phone, email, cpf, birthday} = this.props;

    this.props.navigation.navigate('NewCustomer', {
      id,
      name,
      phone,
      email,
      cpf,
      birthday,
      action: 'edit',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{this.props.name}</Text>
          </View>
          <Touch onPress={() => this.handleCustomerEdition()}>
            <Icon name="edit" style={styles.touchButton} />
          </Touch>
          <Touch onPress={() => this.showInfo()}>
            <Icon
              name={this.state.showInfo ? 'angle-up' : 'angle-down'}
              style={styles.touchButton}
            />
          </Touch>
        </View>
        {this.state.showInfo && (
          <View style={styles.infoContainer}>
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
        )}
      </View>
    );
  }
}

export default CustomerItem;
