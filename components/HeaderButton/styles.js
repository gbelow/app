import {StyleSheet} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.gutter,
  },
  label: {
    alignSelf: 'center',
    color: theme.headerTintColor,
    fontSize: theme.headerLabelSize,
  },
});

export default styles;
