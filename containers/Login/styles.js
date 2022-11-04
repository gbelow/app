import {StyleSheet, Dimensions} from 'react-native';
import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.loginBackgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    alignSelf: 'center',
    width: theme.loginLogoWidth,
    height: theme.loginLogoHeight,
    marginBottom: theme.gutter * 2,
  },
  settingsButtonContainer: {
    paddingTop: theme.gutter,
  },
  headerLeftImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width / 2.2,
  },
  footerRightImage: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: Dimensions.get('window').width / 2.2,
  },
  headerFullImage: {
    position: 'absolute',
    top: 0,
    width: Dimensions.get('window').width,
  },
  footerFullImage: {
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
  },
  registerText: {
    fontSize: theme.smallFontSize,
    color: theme.noLoginTextColor,
    paddingBottom: theme.gutter * 2,
  },
  fbIconContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: theme.fbButtonColor,
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: theme.gutter / 2,
  },
  facebookIcon: {
    fontSize: theme.bigFontSize,
    color: theme.fbButtonColor,
    top: 1,
  },
  fbLabel: {
    fontSize: theme.extraSmallFontSize,
    color: theme.fbButtonColor,
    textAlign: 'center',
  },
  noLoginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 2,
    borderColor: theme.greyLight,
    paddingVertical: theme.gutter / 2,
    marginTop: theme.gutter / 2,
  },
  noLoginText: {
    fontSize: theme.smallFontSize,
    color: theme.noLoginTextColor,
  },
});

export default styles;
