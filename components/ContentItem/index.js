import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image} from 'react-native';

import {Touch} from 'react-native-kin-ui';

import Icon from 'react-native-vector-icons/FontAwesome';
import images from '../../const/images';
import styles from './styles';

class ContentItem extends React.Component {
  static propTypes = {
    image: PropTypes.string,
    date: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    onPress: PropTypes.func,
  };

  render() {
    return (
      <Touch onPress={this.props.onPress}>
        <View style={styles.container}>
          <View style={styles.sourceContainer}>
            {this.props.images && this.props.images.length && (
              <Image
                source={{uri: this.props.images[0]}}
                style={styles.image}
              />
            )}
            {this.props.image && (
              <Image source={{uri: this.props.image}} style={styles.image} />
            )}
            {this.props.video && (
              <Image source={{uri: this.props.thumb}} style={styles.image} />
            )}
            {this.props.pdf && (
              <Image source={{uri: this.props.thumb}} style={styles.image} />
            )}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.date}>{this.props.date}</Text>
            <Text style={styles.title}>{this.props.title}</Text>
            <Text style={styles.description}>{this.props.description}</Text>
            <Text style={styles.readMore}>Leia mais</Text>
          </View>
        </View>
      </Touch>
    );
  }
}

export default ContentItem;
