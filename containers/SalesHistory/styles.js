import {StyleSheet, Dimensions} from 'react-native';
import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.gutter,
    paddingTop: theme.gutter,
    backgroundColor: theme.bodyBackgroundColor,
    justifyContent: 'center',
  },
  date: {
    textAlign: 'center',
    paddingBottom: theme.gutter,
    marginTop: -theme.gutter / 2,
    fontSize: theme.smallFontSize,
  },
  detailInnerContainer: {
    maxHeight: Dimensions.get('window').height / 2,
  },
});

export default styles;
