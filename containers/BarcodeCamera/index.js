import React from 'react';
import {View, Text, Keyboard, StatusBar} from 'react-native';

import {RNCamera} from 'react-native-camera';
import {Button, PermissionDenied} from '../../config/components';

import theme from '../../const/theme';
import styles from './styles';

class BarcodeCamera extends React.Component {
  state = {
    hasReadBarcode: false,
  };

  static navigationOptions = () => ({
    header: null,
  });

  componentDidMount = () => {
    Keyboard.dismiss();
  };

  /**
   * @name onBarCodeRead
   * @description callback when barcode is detected
   * @returns {Void}
   */
  onBarCodeRead(e) {
    if (!this.state.hasReadBarcode) {
      this.setState({
        hasReadBarcode: true,
      });

      const barcode = e.data.toString();
      this.props.navigation.state.params.onBarRead(barcode);

      this.props.navigation.goBack();
    }
  }

  /**
   * @name onCancelCodeRead
   * @description on cancel code read by camera
   * @returns {Void}
   */
  onCancelCodeRead() {
    this.props.navigation.goBack();
  }

  render() {
    const {params} = this.props.navigation.state;

    return (
      <View style={styles.container}>
        {params.permission !== 'denied' && params.permission !== 'restricted' && (
          <View style={styles.inner}>
            <StatusBar animated={true} hidden={true} />
            <RNCamera
              ref={(cam) => {
                this.camera = cam;
              }}
              onBarCodeRead={this.onBarCodeRead.bind(this)}
              style={styles.camera}
            />
            <View style={styles.header}>
              <Text style={styles.description}>
                Posisione a linha vermelha sobre o código de barras e aguarde. A
                leitura é automática.
              </Text>
            </View>
            <View style={styles.redLine} />
            <View style={styles.footer}>
              <Button
                label="Digitar código"
                onPress={this.onCancelCodeRead.bind(this)}
                uppercase={true}
                backgroundColor={theme.yellowLight}
                color={theme.white}
              />
            </View>
          </View>
        )}
        {(params.permission === 'denied' ||
          params.permission === 'restricted') && (
          <PermissionDenied
            navigation={this.props.navigation}
            title="Escaneie códigos de barra automaticamente!"
            message="Permita o acesso à sua câmera para escanear tags de forma automática."
            link="Permitir acesso à câmera"
          />
        )}
      </View>
    );
  }
}

export default BarcodeCamera;
