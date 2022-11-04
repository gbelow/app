import {StyleSheet} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.gutter,
  },
  iconContainer: {
    width: theme.gutter * 1.5,
    marginRight: theme.gutter / 2,
    alignItems: 'center',
  },
  menu: {
    fontSize: theme.mediumFontSize,
    color: 'darkgrey',
    paddingLeft: theme.gutter,
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
