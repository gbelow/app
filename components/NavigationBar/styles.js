import {StyleSheet, Dimensions, Platform} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    marginTop: theme.statusBarHeight,
    backgroundColor: theme.headerBackgroundColor,
    ...Platform.select({
      ios: {
        top: -20,
        paddingTop: 20,
        marginBottom: -20,
      },
    }),
    borderBottomWidth: theme.navBarBorderBottomWidth,
    borderBottomColor: theme.navBarBorderBottomColor,
  },
  inner: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  left: {
    width: Dimensions.get('window').width / 4,
    alignItems: 'flex-start',
  },
  center: {
    width: Dimensions.get('window').width / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    width: Dimensions.get('window').width / 4,
    alignItems: 'flex-end',
  },
  title: {
    alignSelf: 'center',
    fontWeight: '300',
    fontSize: theme.mediumFontSize,
    color: theme.headerTintColor,
  },
});

export default styles;
