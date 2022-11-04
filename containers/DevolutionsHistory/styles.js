import {StyleSheet} from 'react-native';
import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.gutter,
    paddingTop: theme.gutter,
    backgroundColor: theme.bodyBackgroundColor,
    justifyContent: 'center',
  },
  date: {
    textAlign: 'center',
    paddingBottom: theme.gutter,
    marginTop: -theme.gutter / 2,
    fontSize: theme.smallFontSize,
  },
});

export default styles;
