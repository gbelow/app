import {StyleSheet, Dimensions} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'space-between',
    padding: theme.gutter,
    paddingTop: theme.gutter / 2,
  },
  formContainer: {
    paddingBottom: theme.gutter,
    borderBottomWidth: 1,
    borderColor: theme.baseBorderColor,
  },
  cameraContainer: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  customerInputContainer: {
    width: Dimensions.get('window').width - theme.gutter * 2,
    paddingLeft: 0,
    alignSelf: 'flex-start',
  },
  switchContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    paddingBottom: theme.gutter,
  },
  switchText: {
    paddingLeft: theme.gutter / 2,
    fontSize: theme.mediumFontSize,
    color: theme.blackLight,
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
