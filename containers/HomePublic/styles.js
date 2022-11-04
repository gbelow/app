import {StyleSheet, Dimensions} from 'react-native';
import {scale} from '../../helpers/scalling';
import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bodyBackgroundColor,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  headerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.menuBackgroundColor,
  },
  headerLogo: {
    alignSelf: 'center',
    width: theme.headerLogoWidth,
    height: theme.headerLogoHeight,
    marginTop: theme.gutter / 2,
    marginBottom: theme.gutter / 4,
  },
  pushContainer: {
    width: scale(18),
    height: scale(18),
    backgroundColor: theme.pushBackground,
    borderRadius: scale(9),
    alignItems: 'center',
    justifyContent: 'center',
    bottom: scale(4),
  },
  pushLabel: {
    backgroundColor: 'transparent',
    color: theme.white,
    textAlign: 'center',
  },
  contentContainer: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  webviewContainer: {
    flex: 1,
  },
  loginContainer: {
    flexDirection: 'row',
    padding: theme.gutter,
    backgroundColor: theme.blackLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginIcon: {
    color: theme.white,
    fontSize: theme.smallFontSize,
    paddingRight: theme.gutter / 2,
  },
  loginText: {
    color: theme.white,
    fontSize: theme.mediunFontSize,
  },
  feedContainer: {
    flex: 1,
    backgroundColor: theme.white,
  },
  feedTitleContainer: {
    borderBottomWidth: 1,
    borderBottomColor: theme.greyLight,
    paddingBottom: theme.gutter / 2,
    backgroundColor: theme.blackLight,
  },
  feedTitle: {
    fontSize: theme.biggerFontSize,
    color: theme.white,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingTop: theme.gutter,
  },
  feed: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  feedContent: {
    flex: 1,
  },
});

export default styles;
