import {StyleSheet} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bodyBackgroundColor,
    paddingTop: theme.gutter / 2,
  },
  keyboardContainer: {
    flex: 1,
  },
  headerButtonText: {
    color: '#FFF',
  },
});

export default styles;
