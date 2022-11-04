import {StyleSheet} from 'react-native';
import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.white,
    flex: 1,
  },
  placeholderContainer: {
    marginBottom: theme.gutter,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    marginTop: theme.gutter,
  },
});

export default styles;
