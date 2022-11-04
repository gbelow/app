import {StyleSheet, Platform} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bodyBackgroundColor,
  },
  title: {
    fontSize: theme.bigFontSize,
    color: theme.blackLight,
    paddingTop: Platform.OS === 'ios' ? theme.gutter * 2.5 : theme.gutter / 2,
    paddingBottom: theme.gutter / 3,
    textAlign: 'center',
  },
  description: {
    fontSize: theme.baseFontSize,
    color: theme.textSecondary,
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    padding: theme.gutter,
  },
});

export default styles;
