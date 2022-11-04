import {StyleSheet} from 'react-native';
import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {},
  topicContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.gutter,
    borderBottomWidth: 1,
    borderColor: theme.baseBorderColor,
    backgroundColor: theme.white,
  },
  description: {
    flex: 1,
    fontSize: theme.mediumFontSize,
    color: theme.textPrimary,
  },
  indicatorIcon: {
    fontSize: theme.mediumFontSize,
    color: theme.blackLight,
    padding: theme.gutter / 2,
  },
});

export default styles;
