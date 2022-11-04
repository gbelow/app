import {StyleSheet, Dimensions} from 'react-native';
import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bodyBackgroundColor,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: theme.gutter,
  },
  title: {
    paddingTop: theme.gutter,
    paddingBottom: theme.gutter / 2,
    fontSize: theme.bigFontSize,
    color: theme.blackLight,
    fontFamily: theme.fontFamily,
  },
  description: {
    fontSize: theme.smallFontSize,
    color: theme.blackLight,
    fontFamily: theme.fontFamily,
    lineHeight: theme.smallFontSize + theme.gutter / 2,
  },
  descriptionContainer: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderColor: theme.greyLight,
    paddingBottom: theme.gutter,
  },
  noCoupons: {
    fontSize: theme.smallFontSize,
    color: theme.blackLight,
  },
  linkText: {
    color: theme.blue,
  },
  termsContainer: {
    flexDirection: 'row',
    paddingTop: theme.gutter,
  },
  termsText: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  checkIconContainer: {
    flexDirection: 'row',
    backgroundColor: theme.green,
    borderRadius: theme.baseBorderRadius,
    paddingVertical: theme.gutter / 3,
    paddingLeft: theme.gutter / 2,
    alignItems: 'center',
  },
  checkIcon: {
    fontSize: theme.smallFontSize,
    color: theme.white,
  },
  subscriptionText: {
    color: theme.white,
    paddingLeft: theme.gutter / 3,
  },
  link: {
    fontSize: theme.smallFontSize,
    color: theme.blue,
  },
  feedbackContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  coverImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width / 2,
  },
});

export default styles;
