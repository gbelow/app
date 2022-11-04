import {StyleSheet} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bodyBackgroundColor,
    paddingHorizontal: theme.gutter * 2,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    textAlign: 'center',
    marginBottom: theme.gutter,
    fontSize: theme.bigFontSize,
    fontWeight: '500',
    color: theme.textPrimary,
  },
  messageText: {
    textAlign: 'center',
    color: theme.textSecondary,
  },
  linkContainer: {
    marginTop: theme.gutter * 2,
  },
  linkText: {
    color: theme.yellow,
  },
});

export default styles;
