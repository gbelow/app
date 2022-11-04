import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Alert,
  Image,
  FlatList,
  PanResponder,
  findNodeHandle,
} from 'react-native';

import {Touch} from 'react-native-kin-ui';

import Icon from 'react-native-vector-icons/FontAwesome';
import {Stars, TextLink} from '../../config/components';

import images from '../../const/images';
import styles from './styles';

class AchievementModal extends React.Component {
  static propTypes = {
    onConfirm: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    prize: PropTypes.object.isRequired,
    blurAmount: PropTypes.number.isRequired,
  };

  lastBlur = false;

  constructor(props) {
    super(props);

    this.state = {
      viewRef: null,
      isScratched: false,
      showCustomOptions: false,
      blurAmount: this.props.blurAmount,
      stars: 10,
    };
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderRelease: () => {
        this.lastBlur = null;
      },
      onPanResponderMove: this.onPanMove.bind(this),
    });
  }

  /**
   * @name imageLoaded
   * @description called when image has loaded
   * @return {Void}
   */
  imageLoaded() {
    this.setState({
      viewRef: findNodeHandle(this.backgroundImage),
    });
  }

  /**
   * @name onPanMove
   * @description called when swipe touch is detected
   * @return {Void}
   */
  onPanMove(evt, gestureState) {
    const xDif = gestureState.dx;

    if (!this.lastBlur) {
      if (xDif > 150 || xDif < -150) {
        this.lastBlur = xDif;

        const blurAmount = this.state.blurAmount - this.props.blurAmount / 10;
        const stars = Math.round(
          Number((100 * blurAmount) / this.props.blurAmount / 10),
        );

        this.setState({
          blurAmount,
          stars: blurAmount <= 0 ? 0 : stars,
          isScratched: blurAmount <= 0,
        });
      }
    } else if (
      (this.lastBlur < 150 && xDif > 0) ||
      (this.lastBlur > 150 && xDif < 0)
    ) {
      this.lastBlur = null;
    }
  }

  /**
   * @name confirmPrize
   * @description confirm prize
   * @param {Object} option
   * @return {Void}
   */
  confirmPrize(option) {
    const {prize} = this.props;

    this.props.onConfirm({
      prize,
      option,
    });
  }

  /**
   * @name selectCustomOption
   * @description alert user to confirm custom option selection
   * @param {Object} option
   * @return {Void}
   */
  selectCustomOption(option) {
    Alert.alert(
      'Atenção',
      `Deseja confirmar seu prêmio como ${option.description}?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: () => this.confirmPrize(option),
        },
      ],
      {
        cancelable: false,
      },
    );
  }

  /**
   * @name renderCustomOption
   * @description render custom option item
   * @param {Object} item
   * @return {React.Component}
   */
  renderCustomOption({item}) {
    return (
      <Touch onPress={() => this.selectCustomOption(item)}>
        <View style={styles.optionContainer}>
          <Text numberOfLines={1} style={styles.optionDescription}>
            {item.description}
          </Text>
          <Icon name="angle-right" style={styles.angleIcon} />
        </View>
      </Touch>
    );
  }

  render() {
    const {prize} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.overlay}>
          <View style={styles.inner}>
            {this.state.showCustomOptions && (
              <View style={styles.customOptionsContainer}>
                <Text style={styles.optionsTitle}>
                  Selecione entre as opções:
                </Text>
                <FlatList
                  data={prize.options}
                  keyExtractor={(option) => option.code}
                  renderItem={this.renderCustomOption.bind(this)}
                />
              </View>
            )}
            {!this.state.showCustomOptions && (
              <View
                // Detect swipe gestures
                {...this.panResponder.panHandlers}
                style={styles.imageContainer}>
                {prize.image && (
                  <Image
                    source={{uri: prize.image}}
                    ref={(img) => {
                      this.backgroundImage = img;
                    }}
                    onLoadEnd={this.imageLoaded.bind(this)}
                    style={
                      this.state.viewRef ? styles.image : styles.preventImage
                    }
                  />
                )}
                {!prize.image && (
                  <Image
                    source={images.gift}
                    ref={(img) => {
                      this.backgroundImage = img;
                    }}
                    onLoadEnd={this.imageLoaded.bind(this)}
                    style={
                      this.state.viewRef ? styles.image : styles.preventImage
                    }
                  />
                )}
                {this.state.blurAmount >
                  this.props.blurAmount - this.props.blurAmount / 10 && (
                  <Image source={images.gift} style={styles.coverImage} />
                )}
              </View>
            )}
            <View style={styles.descriptionContainer}>
              {!this.state.isScratched && (
                <Stars
                  maxLength={10}
                  total={this.state.stars}
                  showDescription={false}
                  style={styles.stars}
                />
              )}
              {!this.state.isScratched && (
                <Text style={styles.scratchInstructionsText}>
                  Raspe para descrobrir seu prêmio
                </Text>
              )}
              {this.state.isScratched && !this.state.showCustomOptions && (
                <Text style={styles.descriptionText}>{prize.description}</Text>
              )}
            </View>
            <View style={styles.textLinkContainer}>
              {!this.state.isScratched && (
                <TextLink text="Aguardando você raspar" />
              )}
              {this.state.isScratched && !prize.customizable && (
                <TextLink
                  onPress={this.confirmPrize.bind(this)}
                  text="Confirmar recebimento"
                />
              )}
              {this.state.isScratched &&
                prize.customizable &&
                !this.state.showCustomOptions && (
                  <TextLink
                    onPress={() => this.setState({showCustomOptions: true})}
                    text="Customizar prêmio"
                  />
                )}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default AchievementModal;
