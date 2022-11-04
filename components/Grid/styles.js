import {StyleSheet} from 'react-native';
import {scale} from '../../helpers/scalling';
import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.gutter / 2,
    backgroundColor: theme.white,
  },
  innerContainer: {
    height: scale(50),
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: theme.baseBorderColor,
  },
});

export default styles;
