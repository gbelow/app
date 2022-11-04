import React from 'react';
import {connect} from 'react-redux';

import {
  View,
  Text,
  Image,
  Alert,
  StatusBar,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

import {Activity, FormInput, StampsModal} from '../../config/components';

import {Touch} from 'react-native-kin-ui';

import {stampsRequest} from '../../actions/stampActions';

import Gestures from 'react-native-easy-gestures';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../const/theme';
import images from '../../const/images';
import styles from './styles';

class DigitalStamp extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title,
    headerRight: <View />,
  });

  state = {
    sex: 'female',
    color: 'white',
    stamp: null,
    showStamps: false,
    showColors: false,
    showAlign: false,
  };

  componentDidMount() {
    this.props.loadStamps();
  }

  /**
   * @name sendDelivery
   * @description creates new delivery item
   * @returns { void }
   */
  submitData = () => {};

  toggleColors() {
    this.setState({
      showColors: !this.state.showColors,
    });
  }

  toggleAlign() {
    this.setState({
      showAlign: !this.state.showAlign,
    });
  }

  changeColor(color) {
    this.setState({
      color,
      showColors: false,
    });
  }

  changeSex(sex) {
    this.setState({
      sex,
    });
  }

  toggleModal() {
    this.setState({
      showStamps: !this.state.showStamps,
    });
  }

  handleStampSelection(item) {
    this.setState({
      stamp: item.location,
    });

    this.toggleModal();
  }

  alignHorizontalCenter() {
    if (this.state.stamp) {
      this.gestures.updateNativeStyles({
        left: 0,
      });
    }
  }

  alignVerticalCenter() {
    if (this.state.stamp) {
      this.gestures.updateNativeStyles({
        top: 0,
      });
    }
  }

  render() {
    const {stamps} = this.props;
    const {sex, color, stamp} = this.state;
    const {white, whiteDarken, black, blackLight, greyLight} = theme;

    const sexIndex = sex === 'female' ? 'fem' : 'masc';
    const colorIndex = color === 'white' ? 'branco' : 'escuro';

    return (
      <View style={styles.container}>
        <Image
          source={images.shirts[sex][color]}
          style={styles.backgroundImage}
        />
        {!stamp && (
          <View style={styles.noStampContainer}>
            <TouchableOpacity onPress={() => this.toggleModal()}>
              <Icon name="bullseye" style={styles.noStampIcon} />
            </TouchableOpacity>
          </View>
        )}
        {stamps.data && (
          <StampsModal
            visible={this.state.showStamps}
            onClose={() => this.toggleModal()}
            selectStamp={this.handleStampSelection.bind(this)}
            stamps={stamps.data}
            sex={sex}
            color={color}
          />
        )}
        {this.state.showColors && (
          <View style={styles.colorsColumn}>
            <TouchableOpacity onPress={() => this.changeColor('white')}>
              <View style={[styles.circle, {backgroundColor: white}]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.changeColor('black')}>
              <View style={[styles.circle, {backgroundColor: black}]} />
            </TouchableOpacity>
          </View>
        )}
        {this.state.showAlign && (
          <View style={styles.alignColumn}>
            <TouchableOpacity onPress={() => this.alignHorizontalCenter()}>
              <Icon name="align-center" style={styles.optionsIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.alignVerticalCenter()}>
              <Icon name="align-center" style={styles.iconInverted} />
            </TouchableOpacity>
          </View>
        )}
        {stamps.data && (
          <View style={styles.optionsContainer}>
            <View style={[styles.menuContainer, styles.menuLeft]}>
              <TouchableOpacity onPress={() => this.toggleColors()}>
                <View
                  style={[styles.circle, {backgroundColor: this.state.color}]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.menuContainer}>
              <TouchableOpacity onPress={() => this.changeSex('male')}>
                <Icon name="male" style={styles.optionsIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.changeSex('female')}>
                <Icon name="female" style={styles.optionsIcon} />
              </TouchableOpacity>
            </View>
            <View style={[styles.menuContainer, styles.menuRight]}>
              <TouchableOpacity onPress={() => this.toggleAlign()}>
                <Icon name="align-center" style={styles.optionsIcon} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        <View style={styles.stampContainer}>
          {stamp && (
            <View
              style={[
                styles.gesturesContainer,
                {
                  borderColor:
                    color === 'white' ? theme.blackLight : theme.whiteDarken,
                },
              ]}>
              <Gestures
                ref={(c) => {
                  this.gestures = c;
                }}
                rotatable={false}
                onChange={(event, styles) => {
                  console.log('styles');
                }}>
                <TouchableOpacity onPress={() => this.toggleModal()}>
                  <Image
                    source={{uri: stamp}}
                    resizeMode="contain"
                    style={styles.stamp}
                  />
                </TouchableOpacity>
              </Gestures>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const mapStateTopProps = ({stamps}) => {
  return {
    stamps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadStamps: () => {
      dispatch(stampsRequest());
    },
  };
};

export default connect(mapStateTopProps, mapDispatchToProps)(DigitalStamp);
