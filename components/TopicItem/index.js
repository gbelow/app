import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, FlatList} from 'react-native';

import {QuestionItem} from '../../config/components';

import Icon from 'react-native-vector-icons/FontAwesome';
import images from '../../const/images';
import styles from './styles';

class TopicItem extends React.Component {
  static propTypes = {
    description: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
  };

  renderQuestionItem({item}) {
    return <QuestionItem question={item.question} answer={item.answer} />;
  }

  render() {
    const {items} = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.topicTitle}>{this.props.description}</Text>
        <FlatList
          data={items}
          renderItem={this.renderQuestionItem.bind(this)}
          keyExtractor={(item, index) => index}
          ListEmptyComponent={() => {
            if (items && items.length === 0) {
              return (
                <NoResults image={images.products} text="Não há registros" />
              );
            }
            return null;
          }}
        />
      </View>
    );
  }
}

export default TopicItem;
