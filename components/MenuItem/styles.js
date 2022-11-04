import {StyleSheet, Dimensions} from 'react-native';
import theme from '../../const/theme';

const styles = StyleSheet.create({
  // Grid menu
  gridContainer: {
    margin: theme.gutter / 3,
    elevation: theme.menuItemElevation,
    borderWidth: theme.menuItemBorderWidth,
    borderColor: theme.menuItemBorderColor,
    borderRadius: theme.menuItemBorderRadius,
  },
  gridInner: {
    width: Dimensions.get('window').width / 3 - theme.gutter,
    height: Dimensions.get('window').width / 3 - theme.gutter,
    backgroundColor: theme.menuItemBackgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.gutter / 2,
  },
  gridIcon: {
    color: 'white',
    borderRadius: theme.gutter * 1.5,
    textAlign: 'center',
    fontSize: theme.gridIconSize,
    paddingTop: theme.gutter,
    paddingBottom: theme.gutter,
  },
  gridText: {
    textAlign: 'center',
    fontSize: theme.smallFontSize,
    color: theme.menuItemTextColor,
    fontFamily: theme.fontFamily,
  },
  gridImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  // side menu
  sideContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.gutter,
  },
  sideIcon: {
    fontSize: theme.smallFontSize,
    color: theme.grey,
    marginRight: theme.gutter / 2,
    alignItems: 'center',
  },
  sideText: {
    fontSize: theme.smallFontSize,
    color: theme.blackLight,
    fontFamily: theme.fontFamily,
  },
  badgeContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.blue,
    marginLeft: theme.gutter / 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: theme.white,
    fontSize: theme.extraSmallFontSize,
    textAlign: 'center',
  },
});

export default styles;
