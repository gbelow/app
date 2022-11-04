import {StyleSheet} from 'react-native';
import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  basketContainer: {
    borderRightWidth: 0.5,
    borderColor: theme.greyLight,
    justifyContent: 'center',
  },
  trophyImage: {
    width: 28,
    height: 28,
    alignSelf: 'center',
    marginLeft: theme.gutter / 2,
    marginRight: theme.gutter / 2,
  },
});

export default styles;
