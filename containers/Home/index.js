import React from 'react';
import {View, StatusBar, FlatList, Image, ImageBackground} from 'react-native';
import {connect} from 'react-redux';

import {NavigationBar, MenuItem, HeaderButton} from '../../config/components';
import {customNavigate} from '../../actions/navigateActions';
import {meRequest} from '../../actions/meActions';
import images from '../../const/images';
import theme from '../../const/theme';

import styles from './styles';

class Home extends React.Component {
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
    this.refresh();
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

  /**
   * @name refresh
   * @description refresh me
   * @return { Void }
   */
  refresh() {
    this.props.loadMe();
  }

  returnContent(menus) {
    const {submenus} = this.state;
    if (submenus) {
      return (
        <View style={styles.contentContainer}>
          <FlatList
            data={submenus}
            extraData={submenus}
            refreshing={this.meRefreshing}
            onRefresh={this.refresh.bind(this)}
            renderItem={this.renderMenuItem.bind(this)}
            keyExtractor={(item, index) => index.toString()}
            horizontal={false}
            numColumns={3}
          />
        </View>
      );
    }

    return (
      <View style={styles.contentContainer}>
        <FlatList
          data={menus.data && menus.data.grid}
          extraData={menus.data && menus.data.grid}
          refreshing={this.meRefreshing}
          onRefresh={this.refresh.bind(this)}
          renderItem={this.renderMenuItem.bind(this)}
          keyExtractor={(item, index) => index.toString()}
          horizontal={false}
          numColumns={3}
        />
      </View>
    );
  }

  /**
   * @name meRefreshing
   * @description me refreshing control
   * @return { boolean }
   */
  get meRefreshing() {
    const {refresh} = this.props;

    if (refresh && refresh.data) {
      return refresh.data;
    }
    return false;
  }

  formatTotalNumber(number) {
    if (number <= 99) {
      return number.toString();
    }
    return '99+';
  }

  render() {
    const {session, menus} = this.props;

    if (!session.logged) {
      return null;
    }

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.statusBarBackground}
          hidden={false}
          translucent={false}
        />
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
            <View style={styles.headerRightContainer}>
              {session.data.chat && session.data.chat.enabled && (
                <HeaderButton
                  icon="comment"
                  label={this.formatTotalNumber(session.data.chat.unreadCount)}
                  labelStyleContainer={styles.pushContainer}
                  labelStyle={
                    session.data.chat.unreadCount > 99
                      ? styles.pushLabelSmall
                      : styles.pushLabel
                  }
                  onPress={() => this.props.customNavigate(session.data.chat)}
                />
              )}
              {/*
                <HeaderButton
                  icon="bell-o"
                  //label={this.formatTotalNumber(session.data.notification.unreadCount)}
                  //labelStyle={session.data.notification.unreadCount > 99 ? styles.pushLabelSmall : styles.pushLabel}
                  labelStyleContainer={styles.pushContainer}
                  navigation={this.props.navigation}
                  routeName="Notifications"
                />
              */}
            </View>
          }
        />
        {theme.menuBackgroundImage ? (
          <ImageBackground
            source={theme.menuBackgroundImage}
            style={styles.backgroundImage}>
            {this.returnContent(menus)}
          </ImageBackground>
        ) : (
          <View style={styles.menuContainer}>{this.returnContent(menus)}</View>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({menus, session, connection, refresh}) => ({
  menus,
  session,
  connection,
  refresh,
});

const mapDispatchToProps = (dispatch) => ({
  loadMe: () => {
    dispatch(meRequest());
  },
  customNavigate: (data) => {
    dispatch(customNavigate(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
