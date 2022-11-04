import {StyleSheet} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.gutter / 2,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  label: {
    fontSize: theme.extraSmallFontSize,
    marginBottom: theme.gutter / 3,
    color: theme.textSecondary,
    textAlign: 'left',
    fontFamily: theme.fontFamily,
  },
  value: {
    fontSize: theme.smallFontSize,
    fontWeight: '500',
    textAlign: 'left',
    fontFamily: theme.fontFamily,
  },
  icon: {
    alignSelf: 'center',
  },
});

export default styles;
