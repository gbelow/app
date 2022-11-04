import {StyleSheet, Dimensions} from 'react-native';
import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5000,
  },
  inner: {
    width: Dimensions.get('window').width / 1.2,
    backgroundColor: theme.white,
    borderRadius: theme.gutter / 3,
    padding: theme.gutter,
    paddingBottom: theme.gutter * 2,
  },
  title: {
    fontSize: theme.mediumFontSize,
    color: theme.blackLight,
    fontWeight: '500',
    textAlign: 'center',
    paddingBottom: theme.gutter,
  },
  customerContainer: {
    paddingLeft: theme.gutter / 2,
    paddingBottom: theme.gutter,
  },
  customer: {
    textAlign: 'center',
    fontSize: theme.smallFontSize,
    color: theme.textPrimary,
  },
});

export default styles;
