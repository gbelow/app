import {StyleSheet, Dimensions} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    width: Dimensions.get('window').width / 1.2,
    maxHeight: Dimensions.get('window').height,
    backgroundColor: theme.white,
    borderRadius: theme.gutter / 5,
    padding: theme.gutter,
  },
  titleContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingTop: theme.gutter,
  },
  title: {
    fontSize: theme.bigFontSize,
    color: theme.blackLight,
    fontWeight: '500',
    paddingBottom: theme.gutter,
  },
  description: {
    fontSize: theme.mediumFontSize,
    color: theme.textSecondary,
  },
  buttonsContainer: {
    marginTop: theme.gutter,
  },
  confirmButtonContainer: {
    paddingHorizontal: theme.gutter,
    textAlign: 'center',
  },
  textConfirmButton: {
    borderRadius: 3,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: theme.smallFontSize,
    padding: theme.gutter,
    color: theme.blackLight,
    backgroundColor: theme.yellowLight,
  },
  closeButtonContainer: {
    alignItems: 'center',
  },
});

export default styles;
