import {StyleSheet, Dimensions} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bodyBackgroundColor,
    padding: theme.gutter,
  },
  headerIconStyle: {
    fontSize: theme.smallFontSize,
    paddingRight: theme.gutter / 5,
  },
  description: {
    fontSize: theme.smallFontSize,
    color: theme.textPrimary,
    textAlign: 'center',
    paddingBottom: theme.gutter,
  },
  feedbackContainer: {
    maxHeight: Dimensions.get('window').height / 2,
  },
});

export default styles;
