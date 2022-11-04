import {StyleSheet} from 'react-native';

import {scale} from '../../helpers/scalling';
import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: theme.fbButtonBackgroundColor,
    padding: theme.gutter,
    borderRadius: theme.fbButtonBorderRadius,
    elevation: 2,
  },
  icon: {
    fontSize: theme.bigFontSize,
    color: theme.fbButtonTextColor,
  },
  buttonText: {
    color: theme.fbButtonTextColor,
    fontSize: theme.mediumFontSize,
    marginLeft: theme.gutter,
  },
});

export default styles;
