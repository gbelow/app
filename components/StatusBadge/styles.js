import {StyleSheet} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
    width: 40,
    height: 40,
  },
  value: {
    alignSelf: 'center',
    paddingTop: theme.gutter / 4,
    fontSize: theme.mediumFontSize,
    fontWeight: 'bold',
  },
  label: {
    alignSelf: 'center',
    fontSize: theme.smallFontSize,
  },
});

export default styles;
