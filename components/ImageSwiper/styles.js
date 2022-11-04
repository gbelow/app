import {StyleSheet, Dimensions} from 'react-native';
import theme from '../../const/theme';

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlIconButton: {
    fontSize: 30,
    color: theme.blackLight,
    padding: theme.gutter / 2,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width / 0.8,
  },
});

export default styles;
