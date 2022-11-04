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
  closeButtonContainer: {
    alignItems: 'center',
  },
});

export default styles;
