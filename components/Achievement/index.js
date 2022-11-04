import React from 'react';
import PropTypes from 'prop-types';
import {View, Image} from 'react-native';

import {Touch} from 'react-native-kin-ui';

import {Title} from '../../config/components';

import images from '../../const/images';
import styles from './styles';

class Achievement extends React.Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
  };

  render() {
    return (
      <Touch onPress={this.props.onPress.bind(this)}>
        <View style={styles.container}>
          <Title title="Novo prêmio!" uppercase={true} />
          <Image source={images.gift} style={styles.image} />
          <Title
            title="Parabéns pela conquista!"
            subtitle="Abra seu prêmio acima."
            uppercase={true}
          />
        </View>
      </Touch>
    );
  }
}

export default Achievement;
