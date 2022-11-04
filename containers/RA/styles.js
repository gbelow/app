import {StyleSheet} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: theme.blackLight,
    padding: theme.gutter,
  },
  buttonText: {
    color: theme.white,
    textAlign: 'center',
    fontSize: theme.smallFontSize,
    fontWeight: 'bold',
  },
});

export default styles;
