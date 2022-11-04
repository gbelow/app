import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';

import theme from '../../const/theme';
import styles from './styles';

class Avatar extends React.Component {
  static propTypes = {
    homeAvatar: PropTypes.bool,
    size: PropTypes.string,
    company: PropTypes.string,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  };

  get imgContainerStyle() {
    const style = [styles.imgContainer];

    if (this.props.size === 'big') {
      style.push({
        borderRadius: 65,
      });
    }

    if (this.props.homeAvatar) {
      style.push({
        flexDirection: 'row',
        alignItems: 'flex-start',
      });
    }

    return style;
  }

  get imgStyle() {
    const style = [];

    if (this.props.size === 'big') {
      style.push(styles.imgBig);
    } else {
      style.push(styles.img);
    }
    if (this.props.homeAvatar) {
      style.push({
        marginRight: theme.gutter,
      });
    }

    return style;
  }

  get nameStyle() {
    const style = [];

    if (this.props.size === 'big') {
      style.push(styles.nameBig);
    } else {
      style.push(styles.name);
    }

    return style;
  }

  get infoContainerStyle() {
    const style = [];

    if (this.props.homeAvatar) {
      style.push({
        alignSelf: 'center',
        alignItems: 'flex-start',
      });
    } else {
      style.push(styles.infoContainer);
    }

    return style;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inner}>
          <View style={this.imgContainerStyle}>
            <Image source={{uri: this.props.image}} style={this.imgStyle} />
            <View style={this.infoContainerStyle}>
              <Text numberOfLines={1} style={this.nameStyle}>
                {this.props.name}
              </Text>
              {this.props.company && (
                <Text numberOfLines={1} style={styles.company}>
                  {this.props.company}
                </Text>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Avatar;
