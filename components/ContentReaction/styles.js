import {StyleSheet, Dimensions} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: theme.gutter / 2,
    paddingLeft: theme.gutter,
    borderColor: theme.greyLight,
    borderBottomWidth: 1,
  },
  reactionContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: theme.gutter,
    top: theme.gutter / 2,
  },
  title: {
    flex: 0.7,
    fontSize: theme.mediumFontSize,
    color: theme.textSecondary,
  },
  thumb: {
    paddingHorizontal: theme.gutter / 2,
  },
  greyThumb: {
    fontSize: theme.bigFontSize,
    color: theme.grey,
  },
  redThumb: {
    fontSize: theme.bigFontSize,
    color: theme.red,
  },
  blueThumb: {
    fontSize: theme.bigFontSize,
    color: theme.blue,
  },
  reaction: {
    fontSize: theme.smallFontSize,
    color: theme.textPrimary,
    alignSelf: 'center',
    paddingRight: theme.gutter / 2,
  },
});

export default styles;
