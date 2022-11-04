import {StyleSheet} from 'react-native';
import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    padding: theme.gutter,
    alignSelf: 'center',
  },
  termsContainer: {
    flexDirection: 'row',
  },
  termsTextContainer: {
    marginLeft: theme.gutter / 2,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  linkText: {
    color: theme.blue,
    fontSize: theme.smallFontSize,
  },
  termsText: {
    color: theme.blackLight,
    fontSize: theme.smallFontSize,
  },
  radioContainer: {
    paddingBottom: theme.gutter / 2,
  },
  radioLabel: {
    paddingRight: theme.gutter,
  },
});

export default styles;
