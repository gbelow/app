import {StyleSheet} from 'react-native';
import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bodyBackgroundColor,
    paddingHorizontal: theme.gutter,
  },
  title: {
    paddingTop: theme.gutter,
    paddingBottom: theme.gutter / 2,
    fontSize: theme.bigFontSize,
    color: theme.blackLight,
  },
  description: {
    fontSize: theme.smallFontSize,
    color: theme.blackLight,
  },
  descriptionContainer: {
    flex: 1,
    borderBottomWidth: 0.5,
    borderColor: theme.greyLight,
    marginBottom: theme.gutter,
    borderWidth: 1,
    borderRadius: theme.baseBorderRadius,
    borderColor: theme.baseBorderColor,
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
    fontSize: theme.smallFontSize,
    paddingLeft: theme.gutter / 3,
  },
  totalPointsContainer: {
    flexDirection: 'row',
  },
  trophy: {
    width: 25,
    height: 25,
    position: 'absolute',
    top: 0,
    left: -2,
    borderTopLeftRadius: 8,
  },
  points: {
    fontSize: 30,
    color: theme.blackLight,
    fontWeight: '500',
    borderWidth: 1,
    borderRadius: theme.baseBorderRadius,
    borderColor: theme.baseBorderColor,
    paddingHorizontal: theme.gutter * 2,
    marginRight: theme.gutter / 2,
  },
});

export default styles;
