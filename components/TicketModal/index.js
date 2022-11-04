import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Modal, FlatList, TouchableOpacity} from 'react-native';

import {Grid, GridItem} from '../../config/components';

import styles from './styles';

class TicketModal extends React.Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    ticket: PropTypes.object.isRequired,
  };

  /**
   * @name renderTicketItem
   * @description render action item
   * @param {Object} action item
   * @return {React.Component}
   */
  renderTicketItem = ({item}) => (
    <Grid>
      <GridItem label="Tag" value={item.tag} />
    </Grid>
  );

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={this.props.onClose}>
        <TouchableOpacity
          style={styles.container}
          activeOpacity={1}
          onPress={this.props.onClose}>
          <View style={styles.inner}>
            <Text style={styles.title}>Dados da venda</Text>
            <FlatList
              data={this.props.ticket.items}
              keyExtractor={(item) => item.tag}
              renderItem={this.renderTicketItem.bind(this)}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

export default TicketModal;
