import {StyleSheet} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.gutter,
    backgroundColor: theme.bodyBackgroundColor,
  },
  inner: {
    flex: 1,
    justifyContent: 'space-between',
  },
  keyboardContainer: {
    flex: 1,
  },
});

export default styles;
