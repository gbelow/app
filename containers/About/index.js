import React from 'react';
import {connect} from 'react-redux';
import {View, Text, Image, Linking, Platform} from 'react-native';

import {Touch} from 'react-native-kin-ui';

import AppLink from 'react-native-app-link';
import {
  description,
  androidVersion,
  iosVersion,
  appStoreId,
  playStoreId,
} from '../../package.json';
import {versionRequest} from '../../actions/versionActions';
import Icon from 'react-native-vector-icons/FontAwesome';
import images from '../../const/images';
import theme from '../../const/theme';
import styles from './styles';

class About extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title,
    headerRight: <View />,
  });

  componentDidMount() {
    this.props.versionRequest();
  }

  redirectToStore() {
    AppLink.openInStore(appStoreId, playStoreId)
      .then(() => {
        // do stuff
      })
      .catch((err) => {
        // handle error
      });
  }

  render() {
    const {version, connection} = this.props;
    const userVersion = Platform.OS === 'android' ? androidVersion : iosVersion;
    let currentVersion;

    if (version.data) {
      currentVersion =
        Platform.OS === 'android' ? version.data.android : version.data.ios;
    }

    return (
      <View style={styles.container}>
        {theme.showCoverOnAboutPage && (
          <Image source={images.aboutCover} style={styles.coverImage} />
        )}
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Sobre</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.title}>Versão</Text>
          <Text style={styles.description}>
            Você está utilizando a versão {userVersion}.
          </Text>
          <Text style={styles.title}>Versão atual</Text>
          {!connection && (
            <Text style={styles.description}>
              Você está sem conexão, conecte-se para saber a versão atual.
            </Text>
          )}
          {connection && currentVersion && (
            <View style={styles.feedbackContainer}>
              <Text style={styles.description}>
                O app está na versão {currentVersion}.
                {parseFloat(userVersion) === parseFloat(currentVersion) && (
                  <Text>
                    {' '}
                    Continue atualizando o app para aproveitar todos os
                    recursos.
                  </Text>
                )}
              </Text>
              {parseFloat(userVersion) < parseFloat(currentVersion) && (
                <Touch onPress={() => this.redirectToStore()}>
                  <Text style={styles.link}> Clique para atualizar</Text>
                </Touch>
              )}
            </View>
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({version, connection}) => ({
  version,
  connection,
});

const mapDispatchToProps = (dispatch) => ({
  versionRequest: () => {
    dispatch(versionRequest());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(About);
