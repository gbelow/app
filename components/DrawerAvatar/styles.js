import {StyleSheet} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.gutter * 2,
    paddingBottom: theme.gutter,
    marginBottom: theme.gutter,
    backgroundColor: theme.drawerAvatarbackground,
  },
  avatar: {
    width: theme.drawerAvatarSize,
    height: theme.drawerAvatarSize,
    borderRadius: theme.drawerAvatarSize / 2,
  },
  name: {
    color: theme.white,
    fontSize: theme.mediumFontSize,
    marginTop: theme.gutter,
  },
});

export default styles;
