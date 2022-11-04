import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Modal, FlatList, TouchableOpacity} from 'react-native';

import {Touch} from 'react-native-kin-ui';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

class ActionsModal extends React.Component {
  static propTypes = {
    onChangeAction: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    actions: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentAction: PropTypes.object.isRequired,
  };

  /**
   * @name renderActionItem
   * @description render action item
   * @param {Object} action item
   * @return {React.Component}
   */
  renderActionItem({item}) {
    return (
      <Touch onPress={this.changeAction.bind(this, item)}>
        <View style={styles.actionContainer}>
          <Text style={this.actionItemStyle(item)}>{item.description}</Text>
          <Icon
            name="angle-right"
            style={[
              styles.arrowIcon,
              item.actionId !== this.props.currentAction.actionId
                ? null
                : styles.arrowIconSelected,
            ]}
          />
        </View>
      </Touch>
    );
  }

  /**
   * @name actionItemStyle
   * @description return action item style
   * @param {Object} action item
   * @return {Array} style
   */
  actionItemStyle(item) {
    const style = [styles.actionText];

    if (item.actionId === this.props.currentAction.actionId) {
      style.push(styles.actionTextSelected);
    }

    return style;
  }

  /**
   * @name changeAction
   * @description change action if it's not the current action selected
   * @param {Object} action item
   * @return {Void}
   */
  changeAction(item) {
    if (item.actionId !== this.props.currentAction.actionId) {
      this.props.onChangeAction(item);
    }
  }

  /**
   * @name extractKey
   * @description extract key to use on flat list
   * @param {Object} action item
   * @return {Number}
   */
  extractKey = (item) => item.actionId;

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
            <Text style={styles.title}>Ações em andamento</Text>
            <FlatList
              data={this.props.actions}
              keyExtractor={this.extractKey.bind(this)}
              renderItem={this.renderActionItem.bind(this)}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

export default ActionsModal;
