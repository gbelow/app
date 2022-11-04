import {StyleSheet} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    paddingBottom: theme.gutter,
  },
  title: {
    fontSize: theme.smallFontSize,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: theme.smallFontSize,
  },
});

export default styles;
