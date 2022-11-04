import {StyleSheet} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
  },
  label: {
    fontSize: theme.smallFontSize,
    paddingLeft: theme.gutter / 5,
  },
  icon: {
    fontSize: theme.smallFontSize,
  },
});

export default styles;
