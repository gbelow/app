import {StyleSheet, Dimensions} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    backgroundColor: theme.white,
  },
  cancelButton: {
    width: Dimensions.get('window').width / 4,
    padding: theme.gutter,
  },
  cancelText: {
    color: theme.headerTintColor,
    fontSize: theme.smallFontSize,
  },
  createButton: {
    width: Dimensions.get('window').width / 4,
    padding: theme.gutter,
  },
  createText: {
    textAlign: 'right',
    color: theme.headerTintColor,
    fontSize: theme.smallFontSize,
  },
  createIcon: {
    fontSize: 12,
    paddingRight: theme.gutter / 3,
    color: theme.headerTintColor,
  },
  inputContainer: {
    padding: theme.gutter,
    paddingBottom: theme.gutter / 2,
    backgroundColor: theme.searchBackgroundContainer,
  },
});

export default styles;
