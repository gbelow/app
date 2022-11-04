import {StyleSheet, Dimensions} from 'react-native';
import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5000,
  },
  inner: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: theme.white,
    borderRadius: theme.baseBorderRadius,
  },
  buttonContainer: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: theme.greyLight,
    paddingBottom: theme.gutter / 2,
  },
  pdf: {
    flex: 1,
  },
});

export default styles;
