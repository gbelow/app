import {StyleSheet, Dimensions} from 'react-native';
import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
  buttonContainer: {
    alignSelf: 'center',
  },
  title: {
    fontSize: theme.mediumFontSize,
    color: theme.blackLight,
    fontWeight: '300',
    paddingVertical: theme.gutter,
    paddingHorizontal: theme.gutter / 2,
  },
});

export default styles;
