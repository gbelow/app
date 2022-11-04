import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';

import {Touch} from 'react-native-kin-ui';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../const/theme';
import styles from './styles';

class Stars extends React.Component {
  static propTypes = {
    total: PropTypes.number.isRequired,
    maxLength: PropTypes.number.isRequired,
    style: PropTypes.object,
    onChange: PropTypes.func,
    showDescription: PropTypes.bool,
  };

  static defaultProps = {
    total: 1,
  };

  renderStars() {
    const stars = [];
    const {total, maxLength} = this.props;

    for (let i = 0; i < total; i += 1) {
      stars.push(this.renderStaticStar(i));
    }

    for (let i = total; i < maxLength; i += 1) {
      stars.push(this.renderStaticStar(i, theme.noStar));
    }

    return stars;
  }

  renderStaticStar(key, color) {
    const {maxLength, style} = this.props;

    return (
      <Touch onPress={this.onPress.bind(this, key + 1)} key={key}>
        <Icon
          name="star"
          color={color || theme.bronze}
          size={maxLength <= 5 ? 25 : 17}
          style={style}
        />
      </Touch>
    );
  }

  onPress(userRate) {
    if (this.props.onChange) {
      this.props.onChange(userRate);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.starsContainer}>
          {this.renderStars()}
          <Text style={styles.total}>
            {this.props.total} {this.props.total === 1 ? 'estrela' : 'estrelas'}
          </Text>
        </View>
      </View>
    );
  }
}

export default Stars;
