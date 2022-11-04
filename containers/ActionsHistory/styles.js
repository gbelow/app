import {StyleSheet} from 'react-native';
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
  description: {
    textAlign: 'center',
    paddingBottom: theme.gutter,
    marginTop: -theme.gutter / 2,
    fontSize: theme.smallFontSize,
  },
  detailItemImage: {
    width: theme.gutter * 2,
    height: theme.gutter * 2,
    top: theme.gutter / 2,
    marginRight: theme.gutter / 2,
    marginLeft: theme.gutter / 2,
  },
  drawnCouponsContainer: {
    paddingBottom: theme.gutter / 2,
  },
});

export default styles;
