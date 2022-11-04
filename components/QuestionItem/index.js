import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, FlatList} from 'react-native';

import {Touch} from 'react-native-kin-ui';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

class QuestionItem extends React.Component {
  static propTypes = {
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
  };

  state = {
    showAnswer: false,
  };

  toggleAnswer() {
    this.setState({
      showAnswer: !this.state.showAnswer,
    });
  }

  render() {
    return (
      <Touch onPress={() => this.toggleAnswer()}>
        <View style={styles.container}>
          <Text style={styles.description}>{this.props.question}</Text>
          <Icon name="angle-down" style={styles.indicatorIcon} />
        </View>
        {this.state.showAnswer && (
          <Text style={styles.answer}>{this.props.answer}</Text>
        )}
      </Touch>
    );
  }
}

export default QuestionItem;
