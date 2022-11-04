import {StyleSheet, Dimensions} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    padding: theme.gutter,
    alignItems: 'center',
    backgroundColor: theme.yellow,
  },
  containerRadius: {
    width: Dimensions.get('window').width / 1.5,
    borderRadius: Dimensions.get('window').width / 3,
  },
  label: {
    fontSize: theme.smallFontSize,
    paddingTop: theme.gutter / 2,
    color: theme.blackLight,
  },
  icon: {
    fontSize: theme.bigFontSize,
    color: theme.blackLight,
  },
});

export default styles;
