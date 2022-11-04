import {StyleSheet} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center'
  },
  starsContainer: {
    flexDirection: 'row',
  },
  star: {
    paddingHorizontal: 1.5,
  },
  total: {
    fontSize: theme.smallFontSize,
    alignSelf: 'flex-end',
    bottom: 2,
    left: 5,
  },
  bigStar: {
    marginRight: theme.gutter / 2,
    marginVertical: 11,
  },
  animatedStar: {
    height: theme.gutter * 2,
    width: theme.gutter * 2,
    marginHorizontal: -8,
    marginVertical: -8.7,
  },
  bigAnimatedStar: {
    height: theme.gutter * 5,
    width: theme.gutter * 5,
    marginHorizontal: -17,
    marginVertical: -10,
  },
});

export default styles;
