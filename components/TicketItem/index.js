import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';

import {Touch} from 'react-native-kin-ui';

import Icon from 'react-native-vector-icons/FontAwesome';
import images from '../../const/images';
import styles from './styles';

class TicketItem extends React.Component {
  static propTypes = {
    showTicketItems: PropTypes.func,
    onDelete: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
  };

  /**
   * @name onPress
   * @description callback when user press in the trash
   * @return {Void}
   * */
  onPress() {
    if (this.props.onDelete) {
      this.props.onDelete();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inner}>
          <Touch onPress={this.props.showTicketItems}>
            <View>
              <View style={styles.codeContainer}>
                <View style={styles.deleteContainer}>
                  <Touch onPress={this.onPress.bind(this)}>
                    <View style={styles.deleteTouch}>
                      <Icon name="trash" style={styles.deleteIcon} />
                    </View>
                  </Touch>
                </View>
                <Image source={images.basket} style={styles.basketImage} />
                <Text numberOfLines={1} style={styles.ticketText}>
                  Ticket {this.props.id}
                </Text>
              </View>
            </View>
          </Touch>
        </View>
      </View>
    );
  }
}

export default TicketItem;
