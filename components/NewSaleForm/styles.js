import {StyleSheet, Dimensions} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.gutter,
  },
  formContainer: {
    borderBottomWidth: 1,
    borderColor: theme.baseBorderColor,
    paddingBottom: theme.gutter / 2,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.gutter,
  },
  switchText: {
    marginLeft: theme.gutter / 2,
    fontSize: theme.mediumFontSize,
    color: theme.blackLight,
  },
  buttonContainer: {
    alignSelf: 'center',
    width: Dimensions.get('window').width,
  },
  saleItems: {
    flex: 1,
    paddingTop: theme.gutter,
  },
  saleItemsList: {
    paddingBottom: theme.gutter,
  },
});

export default styles;
