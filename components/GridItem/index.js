import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../const/theme';
import styles from './styles';

class GridItem extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    icon: PropTypes.string,
    alignCenter: PropTypes.bool,
    style: PropTypes.number,
  };

  get valueStyle() {
    const style = [styles.value];

    if (this.props.alignCenter) {
      style.push({
        alignSelf: 'center',
      });
    }

    return style;
  }

  render() {
    return (
      <View style={this.props.style || styles.container}>
        {this.props.icon && (
          <Icon
            name={this.props.icon}
            color={theme.blackLight}
            size={theme.mediumFontSize}
            style={styles.icon}
          />
        )}
        {!this.props.icon && (
          <Text ellipsizeMode="tail" numberOfLines={1} style={styles.label}>
            {this.props.label}
          </Text>
        )}
        <Text ellipsizeMode="tail" numberOfLines={1} style={this.valueStyle}>
          {this.props.value}
        </Text>
      </View>
    );
  }
}

export default GridItem;
