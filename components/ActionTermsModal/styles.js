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
    padding: theme.gutter,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: theme.white,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    width: Dimensions.get('window').width,
    backgroundColor: theme.white,
    borderTopWidth: 1,
    borderColor: theme.greyLight,
    paddingBottom: theme.gutter,
  },
});

export default styles;
