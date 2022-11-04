import {StyleSheet, Dimensions} from 'react-native';
import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bodyBackgroundColor,
  },
  swiperContainer: {
    height: Dimensions.get('window').width / 0.8,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width / 1.3,
  },
  videoContainer: {
    flex: 1,
    backgroundColor: theme.blackLight,
    justifyContent: 'center',
    height: Dimensions.get('window').height / 1.3,
  },
  video: {
    height: Dimensions.get('window').width / 1.5,
  },
  videoLandscape: {
    height: Dimensions.get('window').width,
  },
  date: {
    fontWeight: 'bold',
    paddingVertical: theme.gutter,
    paddingHorizontal: theme.gutter,
    fontSize: theme.extraSmallFontSize,
  },
  description: {
    fontSize: theme.smallFontSize,
    paddingHorizontal: theme.gutter,
    paddingBottom: theme.gutter,
  },
  shareButton: {
    padding: theme.gutter,
  },
  shareIcon: {
    color: theme.headerTintColor,
    fontSize: theme.headerIconSize,
  },
  title: {
    fontSize: theme.mediumFontSize,
    color: theme.blackLight,
    padding: theme.gutter,
  },
  textLinkContainer: {
    paddingLeft: theme.gutter,
  },
});

export default styles;
