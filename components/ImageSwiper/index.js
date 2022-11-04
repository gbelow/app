import React from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import {View, Image} from 'react-native';

import {Touch} from 'react-native-kin-ui';

import theme from '../../const/theme';
import styles from './styles';

class ImageSwiper extends React.Component {
  render() {
    return (
      <Swiper
        loadMinimal
        loadMinimalSize={1}
        loop={false}
        activeDotColor={theme.blackLight}>
        {this.props.images.map((image, index) => {
          return (
            <View style={styles.slide} key={index.toString()}>
              <Touch onPress={this.props.onPress}>
                <Image source={{uri: image}} style={styles.image} />
              </Touch>
            </View>
          );
        })}
      </Swiper>
    );
  }
}

export default ImageSwiper;
