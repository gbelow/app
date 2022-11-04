import React from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';

import {Touch} from 'react-native-kin-ui';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

class ContentReaction extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    like: PropTypes.number,
    sendReaction: PropTypes.func,
  };

  state = {
    firstReaction: 0,
  };

  componentDidMount() {
    this.setState({
      firstReaction: this.props.like,
    });
  }

  renderThumbsUp() {
    const {like} = this.props;

    return (
      <Icon
        name="thumbs-up"
        style={like === 1 ? styles.blueThumb : styles.greyThumb}
      />
    );
  }

  renderThumbsDown() {
    const {like} = this.props;

    return (
      <Icon
        name="thumbs-down"
        style={like === -1 ? styles.redThumb : styles.greyThumb}
      />
    );
  }

  sendReaction(reaction) {
    this.props.sendReaction(reaction);
  }

  renderUpCount(total) {
    const {firstReaction} = this.state;
    const {like, reaction} = this.props;

    let count = total;

    if (firstReaction === 1 && (like === 0 || like === -1)) {
      count -= 1;
    } else if (like === 1 && (firstReaction === 0 || firstReaction === -1)) {
      count += 1;
    }

    return this.formatCount(count);
  }

  renderDownCount(total) {
    const {firstReaction} = this.state;
    const {like, reaction} = this.props;

    let count = total;

    if ((firstReaction === 1 || firstReaction === 0) && like === -1) {
      count += 1;
    } else if (firstReaction === -1 && (like === 0 || like === 1)) {
      count -= 1;
    }

    return this.formatCount(count);
  }

  formatCount(number, decimal) {
    if (number > 999) {
      let x = ('' + number).length,
        p = Math.pow,
        m = p(10, decimal);
      x -= x % 3;

      return Math.round((number * m) / p(10, x)) / m + ' kMGTPE'[x / 3];
    }
    return number;
  }

  render() {
    const {reaction} = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.title} numberOfLines={1}>
          {this.props.title}
        </Text>
        <View style={styles.reactionContainer}>
          <Touch onPress={() => this.sendReaction(1)}>
            <View style={styles.thumb}>{this.renderThumbsUp()}</View>
          </Touch>
          <Text style={styles.reaction}>
            {this.renderUpCount(reaction.totalLikes)}
          </Text>
          <Touch onPress={() => this.sendReaction(-1)}>
            <View style={styles.thumb}>{this.renderThumbsDown()}</View>
          </Touch>
          <Text style={styles.reaction}>
            {this.renderDownCount(reaction.totalDislikes)}
          </Text>
        </View>
      </View>
    );
  }
}

export default ContentReaction;
