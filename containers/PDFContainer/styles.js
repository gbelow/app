import {StyleSheet} from 'react-native';
import theme from '../../const/theme';

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
  },
  shareButton: {
    padding: theme.gutter,
  },
  shareIcon: {
    color: theme.headerTintColor,
    fontSize: theme.headerIconSize,
  },
});

export default styles;
