import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, FlatList} from 'react-native';

import {Touch} from 'react-native-kin-ui';

import {productDetailRequest} from '../../actions/cavabenActions';

import images from '../../const/images';
import styles from './styles';

class ContentReferences extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    references: PropTypes.array,
  };

  renderItem({item}) {
    return (
      <Touch onPress={() => this.props.loadDetail(item.contentId)}>
        <View>
          <View style={styles.itemContainer}>
            <Image
              source={{uri: item.urlThumbnail}}
              style={styles.thumbImage}
            />
          </View>
          <Text numberOfLines={1} style={styles.name}>
            {item.description}
          </Text>
        </View>
      </Touch>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>
        <FlatList
          horizontal
          data={this.props.references}
          keyExtractor={(item, index) => index}
          renderItem={this.renderItem.bind(this)}
        />
      </View>
    );
  }
}

export default ContentReferences;
