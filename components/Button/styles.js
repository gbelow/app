import {StyleSheet, Dimensions} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.gutter,
    borderRadius: 3,
    width: Dimensions.get('window').width - theme.gutter * 2,
  },
  containerDisabled: {
    opacity: 0.5,
  },
  label: {
    color: theme.blackLight,
    fontSize: theme.smallFontSize,
    fontWeight: 'bold',
  },
  icon: {
    color: theme.greyLight,
    fontSize: theme.bigFontSize,
    fontWeight: 'bold',
  },
});

export default styles;
