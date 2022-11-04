import {StyleSheet, Dimensions, Platform} from 'react-native';
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
    width: scale(20),
    height: scale(20),
    backgroundColor: theme.pushBackground,
    borderRadius: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
    bottom: scale(4),
  },
  pushLabel: {
    backgroundColor: 'transparent',
    color: theme.white,
    textAlign: 'center',
    fontSize: scale(12),
  },
  pushLabelSmall: {
    backgroundColor: 'transparent',
    color: theme.white,
    textAlign: 'center',
    fontSize: scale(9),
  },
  headerRightContainer: {
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 1,
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
});

export default styles;
