import {StyleSheet} from 'react-native';
import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bodyBackgroundColor,
  },
  inputContainer: {
    padding: theme.gutter,
    paddingBottom: theme.gutter / 2,
    backgroundColor: theme.searchBackgroundContainer,
  },
});

export default styles;
