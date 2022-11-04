import React from 'react';
import {connect} from 'react-redux';

import {
  View,
  Text,
  Image,
  ImageEditor,
  ImageStore,
  Alert,
  StatusBar,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

import {
  Activity,
  FormInput,
  PictureBox,
  FoldersModal,
  TextLink,
} from '../../config/components';

import {Touch} from 'react-native-kin-ui';

import {s3SendRequest} from '../../actions/s3Actions';

import {pilotFoldersRequest} from '../../actions/pilotPhotosActions';

import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RNCamera} from 'react-native-camera';
import images from '../../const/images';
import styles from './styles';

class PilotFilePhoto extends React.Component {
  state = {
    pf: null,
    name: null,
    directory: null,
    activity: false,
    tabActive: 'front',
    frontPicture: null,
    backPicture: null,
    showFoldersModal: false,
  };

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title,
    headerRight: <View />,
  });

  componentWillMount() {
    if (this.props.pilotLastFolder.data) {
      this.setState({
        directory: this.props.pilotLastFolder.data,
      });
    }

    this.props.foldersRequest();
  }

  takePicture = () => {
    if (this.camera) {
      this.setState({
        activity: true,
      });

      this.camera
        .capture({
          jpegQuality: 80,
        })
        .then(this._onCapturePicture.bind(this));
    }
  };

  _onCapturePicture(data) {
    const {tabActive, extraPicture} = this.state;

    if (tabActive === 'front') {
      this.setState({frontPicture: data.path});
    } else if (tabActive === 'back') {
      this.setState({backPicture: data.path});
    } else if (tabActive === 'info') {
      if (extraPicture === 'detail') {
        this.setState({detailPicture: data.path});
      } else if (extraPicture === 'side') {
        this.setState({sidePicture: data.path});
      }

      this.setState({extraPicture: null});
    }

    this.setState({activity: false});
  }

  showImagePicker() {
    const options = {};
    const {tabActive, extraPicture} = this.state;

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.error) {
        Alert.alert('Ooops', 'Ocorreu um erro inesperado', [{text: 'OK'}], {
          cancelable: false,
        });
      } else {
        if (tabActive === 'front') {
          this.setState({frontPicture: response.uri});
        } else if (tabActive === 'back') {
          this.setState({backPicture: response.uri});
        } else if (tabActive === 'info') {
          if (extraPicture === 'detail') {
            this.setState({detailPicture: response.uri});
          } else if (extraPicture === 'side') {
            this.setState({sidePicture: response.uri});
          }

          this.setState({extraPicture: null});
        }
      }
    });
  }

  changeTab(tab) {
    this.setState({
      tabActive: tab,
      extraPicture: null,
    });
  }

  submitData = () => {
    let error = false;
    let tab = 'info';
    const {
      pf,
      name,
      directory,
      frontPicture,
      backPicture,
      detailPicture,
      sidePicture,
    } = this.state;

    if (frontPicture) {
      if (backPicture) {
        if (pf && name && directory) {
          this.props.s3SendRequest({
            pf,
            name,
            directory,
            frontPicture,
            backPicture,
            sidePicture,
            detailPicture,
          });
        } else {
          error = 'Você deve informar o PF, o nome e a pasta dos arquivos.';
        }
      } else {
        error = 'Você deve bater uma foto de trás';
        tab = 'back';
      }
    } else {
      error = 'Você deve bater uma foto de frente';
      tab = 'front';
    }

    if (error) {
      Alert.alert(
        'Ooops',
        error,
        [
          {
            text: 'OK',
            onPress: () => this.changeTab(tab),
          },
        ],
        {cancelable: false},
      );
    }
  };

  toggleFoldersModal() {
    this.setState({
      showFoldersModal: !this.state.showFoldersModal,
    });
  }

  handleFolderSelection(directory) {
    this.setState({
      directory,
      showFoldersModal: false,
    });
  }

  render() {
    const {pilotFolders} = this.props;
    const {
      tabActive,
      frontPicture,
      backPicture,
      extraPicture,
      detailPicture,
      sidePicture,
    } = this.state;

    return (
      <View style={styles.container}>
        <RNCamera ref={(cam) => (this.camera = cam)} style={styles.camera} />
        {tabActive === 'front' && frontPicture && (
          <Image style={styles.preview} source={{uri: frontPicture}} />
        )}
        {tabActive === 'front' && (
          <View style={styles.cameraButtons}>
            {!frontPicture && (
              <TouchableOpacity
                style={styles.captureButton}
                onPress={this.takePicture}>
                <Image source={images.camera.photo_camera} />
              </TouchableOpacity>
            )}
            {frontPicture && (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => this.setState({frontPicture: null})}>
                <Icon name="close" style={styles.cancelIcon} />
              </TouchableOpacity>
            )}
            {frontPicture && (
              <TouchableOpacity
                style={styles.nextButton}
                onPress={() => this.changeTab('back')}>
                <Icon name="angle-right" style={styles.nextIcon} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.galleryButton}
              onPress={() => this.showImagePicker()}>
              <Icon name="image" style={styles.galleryIcon} />
            </TouchableOpacity>
          </View>
        )}
        {tabActive === 'back' && backPicture && (
          <Image style={styles.preview} source={{uri: backPicture}} />
        )}
        {tabActive === 'back' && (
          <View style={styles.cameraButtons}>
            {!backPicture && (
              <TouchableOpacity
                style={styles.captureButton}
                onPress={this.takePicture}>
                <Image source={images.camera.photo_camera} />
              </TouchableOpacity>
            )}
            {backPicture && (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => this.setState({backPicture: null})}>
                <Icon name="close" style={styles.cancelIcon} />
              </TouchableOpacity>
            )}
            {backPicture && (
              <TouchableOpacity
                style={styles.nextButton}
                onPress={() => this.changeTab('info')}>
                <Icon name="angle-right" style={styles.nextIcon} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.galleryButton}
              onPress={() => this.showImagePicker()}>
              <Icon name="image" style={styles.galleryIcon} />
            </TouchableOpacity>
          </View>
        )}
        {tabActive === 'info' && extraPicture && (
          <View style={styles.cameraButtons}>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={this.takePicture}>
              <Image source={images.camera.photo_camera} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.galleryButton}
              onPress={() => this.showImagePicker()}>
              <Icon name="image" style={styles.galleryIcon} />
            </TouchableOpacity>
          </View>
        )}
        {tabActive === 'info' && !extraPicture && (
          <View style={styles.infoContainer}>
            <View style={styles.infoInnerContainer}>
              <FormInput
                ref="pf"
                returnKeyType="next"
                iconRightName="file"
                placeholder="Digite o PF"
                keyboardType="numeric"
                value={this.state.pf}
                onSubmitEditing={() => this.refs.name.focus()}
                onChangeText={(pf) => this.setState({pf})}
              />
              <FormInput
                ref="name"
                returnKeyType="next"
                iconRightName="adn"
                placeholder="Digite o nome"
                value={this.state.name}
                onSubmitEditing={() => this.refs.directory.focus()}
                onChangeText={(name) => this.setState({name})}
              />
              <FormInput
                ref="directory"
                returnKeyType="next"
                iconRightName="folder"
                placeholder="Digite o nome da pasta"
                value={this.state.directory}
                onSubmitEditing={Keyboard.dismiss.bind(this)}
                onChangeText={(directory) => this.setState({directory})}
              />
              <TextLink
                onPress={this.toggleFoldersModal.bind(this)}
                text="Visualizar pastas"
                styles={styles.textLink}
              />
              <Text style={styles.title}>Outras opções</Text>
              <View style={styles.extraPicturesContainer}>
                <PictureBox
                  title="Detalhe"
                  handleTakePicture={() =>
                    this.setState({extraPicture: 'detail'})
                  }
                  image={detailPicture}
                  handleRemovePicture={() =>
                    this.setState({detailPicture: null})
                  }
                />
                <PictureBox
                  title="Lateral"
                  handleTakePicture={() =>
                    this.setState({extraPicture: 'side'})
                  }
                  image={sidePicture}
                  handleRemovePicture={() => this.setState({sidePicture: null})}
                />
              </View>
            </View>
          </View>
        )}
        {tabActive === 'info' && !extraPicture && (
          <TouchableOpacity style={styles.sendButton} onPress={this.submitData}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        )}
        <View style={styles.tabsContainer}>
          <View>
            <Touch onPress={() => this.changeTab('front')}>
              <View
                style={
                  tabActive === 'front'
                    ? [styles.tab, styles.tabActive]
                    : styles.tab
                }>
                <Text style={styles.tabLabel}>Foto: Frente</Text>
              </View>
            </Touch>
          </View>
          <View>
            <Touch onPress={() => this.changeTab('back')}>
              <View
                style={
                  tabActive === 'back'
                    ? [styles.tab, styles.tabActive]
                    : styles.tab
                }>
                <Text style={styles.tabLabel}>Foto: Costas</Text>
              </View>
            </Touch>
          </View>
          <View>
            <Touch onPress={() => this.changeTab('info')}>
              <View
                style={
                  tabActive === 'info'
                    ? [styles.tab, styles.tabActive]
                    : styles.tab
                }>
                <Text style={styles.tabLabel}>Informações</Text>
              </View>
            </Touch>
          </View>
        </View>
        <FoldersModal
          visible={this.state.showFoldersModal}
          onClose={() => this.toggleFoldersModal()}
          selectFolder={this.handleFolderSelection.bind(this)}
          folders={pilotFolders.data}
        />
        <Activity show={this.state.activity} />
      </View>
    );
  }
}

const mapStateTopProps = ({me, pilotLastFolder, pilotFolders}) => {
  return {
    me,
    pilotLastFolder,
    pilotFolders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    s3SendRequest: (data) => {
      dispatch(s3SendRequest(data));
    },
    foldersRequest: () => {
      dispatch(pilotFoldersRequest());
    },
  };
};

export default connect(mapStateTopProps, mapDispatchToProps)(PilotFilePhoto);
