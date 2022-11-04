import {StyleSheet, Dimensions} from 'react-native';
import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    backgroundColor: theme.blackLight,
    height: Dimensions.get('window').height / 5,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    paddingHorizontal: theme.gutter,
    color: theme.white,
    fontSize: theme.smallFontSize,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.blackLight,
    height: Dimensions.get('window').height / 5,
  },
  redLine: {
    position: 'absolute',
    top: Dimensions.get('window').height / 2,
    borderBottomWidth: 1,
    borderBottomColor: theme.red,
    width: Dimensions.get('window').width + 10,
  },
});

export default styles;
