import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';

import {Touch} from 'react-native-kin-ui';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

class SaleItem extends React.Component {
  static propTypes = {
    onDelete: PropTypes.func.isRequired,
    tag: PropTypes.string.isRequired,
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

  containerStyle() {
    let style = [styles.container];

    if (this.props.index === 0) {
      style.push(styles.itemLeft);
    } else if (this.props.index % 2 === 0) {
      style.push(styles.itemLeft);
    } else {
      style.push(styles.itemRight);
    }

    return style;
  }

  render() {
    return (
      <View style={this.containerStyle()}>
        <View style={styles.deleteContainer}>
          <Touch onPress={this.onPress.bind(this)}>
            <View style={styles.deleteTouch}>
              <Icon name="trash" style={styles.deleteIcon} />
            </View>
          </Touch>
        </View>
        <Icon name="barcode" style={styles.codeIcon} />
        <Text numberOfLines={1} style={styles.codeText}>
          {this.props.tag}
        </Text>
      </View>
    );
  }
}

export default SaleItem;
