import {StyleSheet, Platform} from 'react-native';
import {scale} from '../../helpers/scalling';
import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: theme.inputBorderColor,
    borderWidth: theme.inputBorderWidth,
    borderBottomWidth: theme.inputBorderBottomWidth,
    backgroundColor: theme.inputBackgrondColor,
    paddingLeft: theme.gutter,
    marginBottom: theme.gutter / 2,
  },
  input: {
    flex: 1,
    fontSize: theme.smallFontSize,
    paddingVertical:
      Platform.OS === 'ios' ? theme.gutter / 1.5 : theme.gutter / 2.5,
    fontFamily: theme.fontFamily,
  },
  inputWithIconRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerWithErrorAndBorder: {
    borderBottomColor: 'red',
  },
  iconRightContainer: {
    alignItems: 'center',
  },
  iconRight: {
    backgroundColor: 'transparent',
    fontSize: scale(15),
    paddingHorizontal: theme.gutter,
    paddingVertical: theme.gutter / 1.5,
  },
});

export default styles;
