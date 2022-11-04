import {StyleSheet} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bodyBackgroundColor,
  },
  keyboardContainer: {
    flex: 1,
  },
  headerIconStyle: {
    color: theme.headerTintColor,
    fontSize: theme.smallFontSize,
    paddingRight: theme.gutter / 5,
  },
  headerButtonText: {
    color: theme.headerTintColor,
    fontSize: theme.smallFontSize,
  },
});

export default styles;
