import {StyleSheet, Dimensions} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.gutter / 3,
  },
  label: {
    fontSize: theme.mediumFontSize,
    marginBottom: theme.gutter / 3,
    color: theme.textSecondary,
    textAlign: 'left',
  },
  value: {
    fontSize: theme.mediumFontSize,
    fontWeight: '500',
    color: theme.textPrimary,
    textAlign: 'left',
  },
  image: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
  },
});

export default styles;
