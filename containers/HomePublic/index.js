import React from 'react';
import {
  Text,
  View,
  StatusBar,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';

import {NavigationBar, MenuItem, HeaderButton} from '../../config/components';
import {brand, blogUrl, rssFeedUrl} from '../../package.json';
import {publicMenusRequest} from '../../actions/menusActions';
import {rssFeedRequest} from '../../actions/rssFeedActions';
import images from '../../const/images';
import theme from '../../const/theme';

import styles from './styles';

let rssFeed = null;

class HomePublic extends React.Component {
  static navigationOptions = () => ({
    header: null,
  });

  constructor(props) {
    super(props);

    this.state = {
      submenus: null,
    };
  }

  componentDidMount() {
    if (rssFeedUrl) {
      this.props.loadRssFeed();
    } else if (!blogUrl && !rssFeedUrl) {
      this.props.loadMenus();
    }
  }

  handlePressMenu(submenus) {
    this.setState({
      submenus,
    });
  }

  handleBack() {
    this.setState({
      submenus: null,
    });
  }

  renderMenuItem({item}) {
    return (
      <MenuItem
        menu={item}
        handlePress={(e) => this.handlePressMenu(e)}
        position="grid"
      />
    );
  }

  returnContent(publicMenus) {
    const {submenus} = this.state;

    if (submenus) {
      return (
        <View style={styles.contentContainer}>
          <FlatList
            data={submenus}
            extraData={submenus}
            renderItem={this.renderMenuItem.bind(this)}
            keyExtractor={(item, index) => index}
            numColumns={3}
          />
        </View>
      );
    }

    return (
      <View style={styles.contentContainer}>
        <FlatList
          data={publicMenus.data && publicMenus.data.grid}
          extraData={publicMenus.data && publicMenus.data.grid}
          renderItem={this.renderMenuItem.bind(this)}
          keyExtractor={(item, index) => index}
          numColumns={3}
        />
      </View>
    );
  }

  renderRssFeed() {
    const {rssFeed} = this.props;

    if (rssFeed.data) {
      return <WebView source={{html: rssFeed.data}} style={styles.rssFeed} />;
    }
  }

  render() {
    const {publicMenus, navigation} = this.props;

    return (
      <View style={styles.container}>
        {blogUrl || (rssFeedUrl && <StatusBar hidden={true} />)}
        {!blogUrl && !rssFeedUrl && (
          <StatusBar
            barStyle="light-content"
            backgroundColor={theme.statusBarBackground}
            hidden={false}
            translucent={false}
          />
        )}
        {!!blogUrl && (
          <View style={styles.webviewContainer}>
            <WebView startInLoadingState source={{uri: blogUrl}} />
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <View style={styles.loginContainer}>
                <Icon name="sign-in" style={styles.loginIcon} />
                <Text style={styles.loginText}>Fazer login</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        {rssFeedUrl && (
          <View style={styles.feedContainer}>
            <View style={styles.feedTitleContainer}>
              <Text style={styles.feedTitle}>Novidades {brand}</Text>
            </View>
            <View style={styles.feedContent}>{this.renderRssFeed()}</View>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <View style={styles.loginContainer}>
                <Icon name="sign-in" style={styles.loginIcon} />
                <Text style={styles.loginText}>Fazer login</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        {!blogUrl && !rssFeedUrl && (
          <NavigationBar
            left={
              <View style={styles.headerLeftContainer}>
                {this.state.submenus ? (
                  <HeaderButton
                    onPress={this.handleBack.bind(this)}
                    icon="arrow-left"
                  />
                ) : (
                  <HeaderButton
                    icon="bars"
                    navigation={this.props.navigation}
                    routeName="DrawerOpen"
                  />
                )}
              </View>
            }
            center={
              <>
                {theme.showLogoOnNavbar && (
                  <Image source={images.logos.home} style={styles.headerLogo} />
                )}
              </>
            }
            right={
              <HeaderButton
                label="Login"
                navigation={navigation}
                routeName="Login"
              />
            }
          />
        )}
        {!blogUrl && !rssFeedUrl && theme.menuBackgroundImage && (
          <ImageBackground
            source={theme.menuBackgroundImage}
            style={styles.backgroundImage}>
            {this.returnContent(publicMenus)}
          </ImageBackground>
        )}
        {!blogUrl && !rssFeedUrl && !theme.menuBackgroundImage && (
          <View style={styles.menuContainer}>
            {this.returnContent(publicMenus)}
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({publicMenus, rssFeed, connection, refresh}) => ({
  publicMenus,
  rssFeed,
  connection,
  refresh,
});

const mapDispatchToProps = (dispatch) => ({
  loadMenus: () => {
    dispatch(publicMenusRequest());
  },
  loadRssFeed: () => {
    dispatch(rssFeedRequest());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePublic);
