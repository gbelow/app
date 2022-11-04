import {StyleSheet, Dimensions} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    margin: theme.gutter,
    borderRadius: 5,
    width: Dimensions.get('window').width - theme.gutter * 2,
  },
  infoContainer: {
    paddingVertical: theme.gutter,
  },
  date: {
    fontSize: theme.extraSmallFontSize,
    paddingTop: theme.gutter / 2,
  },
  title: {
    fontSize: theme.smallFontSize,
    fontWeight: '500',
    paddingVertical: theme.gutter / 2,
  },
  description: {
    fontSize: theme.smallFontSize,
  },
  readMore: {
    fontSize: theme.smallFontSize,
    color: theme.blue,
    paddingTop: theme.gutter / 2,
    marginTop: theme.gutter / 2,
    borderTopColor: theme.greyLight,
    borderTopWidth: 0.5,
  },
  sourceContainer: {
    justifyContent: 'center',
    width: Dimensions.get('window').width - theme.gutter * 2,
    height: Dimensions.get('window').width / 1.92,
    backgroundColor: theme.greyLight,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  image: {
    width: Dimensions.get('window').width - theme.gutter * 2,
    height: Dimensions.get('window').width / 1.92,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  slideImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
});

export default styles;
