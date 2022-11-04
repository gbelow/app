import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Image,
  Alert,
  Linking,
  Platform,
  ImageStore,
  ImageEditor,
  Modal,
  TouchableOpacity,
} from 'react-native';

import {Toast} from '../../config/components';

import {WebView} from 'react-native-webview';
import {ScreenLoading} from 'react-native-kin-ui';
// import RNFetchBlob from 'rn-fetch-blob';
import {RNCamera} from 'react-native-camera';
import {RNS3} from 'react-native-aws3';
import Permissions from 'react-native-permissions';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Share from 'react-native-share';
import images from '../../const/images';
import uuid from 'uuid';
import styles from './styles';

class WebContainer extends React.Component {
  toastTimeout = null;

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title,
    headerRight: <View />,
  });

  state = {
    showCamera: false,
    picture: null,
    showToast: false,
  };

  handleError() {
    Linking.openURL(this.props.navigation.state.params.url);
  }

  handleMessage(event) {
    let data = JSON.parse(event.nativeEvent.data);

    if (data && data.method) {
      if (data.method === 'getCoordinates') {
        navigator.geolocation.getCurrentPosition((position) => {
          const location = JSON.stringify({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });

          this.refs.webview.postMessage(location);
        }),
          (error) => console.log('error'),
          {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 1000,
          };
      } else if (
        data.method === 'downloadFiles' &&
        data.data &&
        data.data.length
      ) {
        const file = data.data[0];

        Platform.OS === 'ios'
          ? this.downloadFileIOS(file)
          : this.downloadFileAndroid(file);
      } else if (data.method === 'getCamera') {
        Permissions.request('camera').then((response) => {
          Permissions.request('photo').then((response) => {
            this.toggleCamera();
          });
        });
      }
    }
  }

  downloadFileIOS(file) {
    let fileUrl = file.url;
    let error = false;

    if (
      file.url.includes('.jpg') ||
      file.url.includes('.jpeg') ||
      file.url.includes('.png')
    ) {
      Image.getSize(
        fileUrl,
        (width, height) => {
          const cropInfo = {
            size: {width, height},
            offset: {x: 0, y: 0},
          };

          ImageEditor.cropImage(
            fileUrl,
            cropInfo,
            (fileUrl) => {
              ImageStore.getBase64ForTag(
                fileUrl,
                (pictureBase64) => {
                  let url = `data:image/png;base64,${pictureBase64}`;

                  Share.open({url})
                    .then((res) => {})
                    .catch((err) => {
                      error = true;
                    });
                },
                (reason) => (error = true),
              );
            },
            (reason) => (error = true),
          );
        },
        (reason) => {
          error = true;
        },
      );

      if (error) {
        let url = file.url;

        Share.open({url})
          .then((res) => {
            console.log('res');
          })
          .catch((err) => {
            err && console.log('err1');
          });
      }
    } else if (file.url.includes('.pdf')) {
      this.props.navigation.navigate('PDFContainer', {
        title: file.title,
        url: file.url,
      });
    } else if (file.url.includes('.mp4')) {
      let url = file.url;

      Share.open({url})
        .then((res) => {
          console.log('res');
        })
        .catch((err) => {
          err && console.log('err');
        });
    }
  }

  downloadFileAndroid(file) {
    let type;
    let mime;

    if (file.url) {
      if (file.url.includes('.pdf')) {
        type = 'pdf';
        mime = 'application/pdf';
      } else if (file.url.includes('.jpg')) {
        type = 'jpg';
        mime = 'image/jpg';
      } else if (file.url.includes('.png')) {
        type = 'png';
        mime = 'image/png';
      } else if (file.url.includes('.mp4')) {
        type = 'mp4';
        mime = 'video/mp4';
      }
    }

    // RNFetchBlob.config({
    //   fileCache : true,
    //   addAndroidDownloads : {
    //     useDownloadManager : true,
    //     notification : true,
    //     title : 'Download concluído com sucesso!',
    //     description : 'Arquivo baixado de App Colcci',
    //     mime,
    //     mediaScannable : true,
    //   },
    //   path : `${RNFetchBlob.fs.dirs.DCIMDir}/${file.title}.${type}`
    // })
    // .fetch('GET', file.url)
    // .then((res) => {})
  }

  toggleCamera() {
    this.setState({
      showCamera: !this.state.showCamera,
    });
  }

  showImagePicker() {
    const options = {};

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.error) {
        Alert.alert('Ooops', 'Ocorreu um erro inesperado', [{text: 'OK'}], {
          cancelable: false,
        });
      } else {
        this.setState({picture: response.uri});
      }
    });
  }

  submitPicture() {
    this.setState({showToast: true});
    this.toastTimeout = setTimeout(this.hideToast.bind(this), 5000);

    const options = {
      keyPrefix: 'web-photos/',
      bucket: 'adapcon-amc-kincode-upload',
      region: 'sa-east-1',
      accessKey: 'AKIAIRCRUR2F56XKQ4GQ',
      secretKey: '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',
      successActionStatus: 201,
    };

    let picture = {
      uri: this.state.picture,
      name: `${uuid()}.jpg`,
      type: 'image/jpg',
    };

    RNS3.put(picture, options).then((response) => {
      if (response.status !== 201) {
        error = true;
      } else {
        if (response.body && response.body.postResponse) {
          let url = response.body.postResponse.location;

          this.refs.webview.postMessage(url);
          this.toggleCamera();
        }
      }
    });
  }

  hideToast() {
    clearTimeout(this.toastTimeout);
    this.setState({showToast: false});
  }

  takePicture = () => {
    if (this.camera) {
      this.camera
        .capture({
          jpegQuality: 80,
        })
        .then(this._onCapturePicture.bind(this));
    }
  };

  _onCapturePicture(data) {
    let path = data.path;

    if (Platform.OS === 'ios') {
      path.replace('file://', '');
    }

    this.setState({
      picture: path,
    });
  }

  render() {
    const {picture} = this.state;

    return (
      <View style={styles.container}>
        <WebView
          ref="webview"
          startInLoadingState
          onMessage={(event) => this.handleMessage(event)}
          source={{uri: this.props.navigation.state.params.url}}
          onError={this.handleError.bind(this)}
        />
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.showCamera}
          onRequestClose={() => this.toggleCamera()}>
          <View style={styles.cameraContainer}>
            <RNCamera
              ref={(cam) => (this.camera = cam)}
              style={styles.camera}
            />
            {picture && (
              <Image source={{uri: picture}} style={styles.preview} />
            )}
            <View style={styles.cameraButtons}>
              {!picture && (
                <TouchableOpacity
                  style={styles.captureButton}
                  onPress={this.takePicture}>
                  <Image source={images.camera.photo_camera} />
                </TouchableOpacity>
              )}
              {picture && (
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => this.setState({picture: null})}>
                  <Icon name="close" style={styles.cancelIcon} />
                </TouchableOpacity>
              )}
              {picture && (
                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={() => this.submitPicture()}>
                  <Icon name="angle-right" style={styles.nextIcon} />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.galleryButton}
                onPress={() => this.showImagePicker()}>
                <Icon name="image" style={styles.galleryIcon} />
              </TouchableOpacity>
            </View>
          </View>
          {this.state.showActivity && <ScreenLoading />}
          {this.state.showToast && (
            <Toast
              message="Aguarde... estamos processando sua imagem."
              position="top"
              onCloseButtonPress={this.hideToast.bind(this)}
            />
          )}
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = ({session}) => ({
  session,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WebContainer);
