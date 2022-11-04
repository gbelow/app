import {StyleSheet} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    paddingBottom: theme.gutter,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: theme.gutter,
  },
  termsText: {
    paddingLeft: theme.gutter / 3,
    paddingRight: theme.gutter / 5,
  },
});

export default styles;
