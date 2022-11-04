import {StyleSheet, Dimensions} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    paddingBottom: theme.gutter,
    paddingHorizontal: theme.gutter,
  },
  itemContainer: {
    margin: theme.gutter / 3,
    width: Dimensions.get('window').width / 2.5,
    height: Dimensions.get('window').width / 3,
    backgroundColor: theme.greyLight,
  },
  thumbImage: {
    width: Dimensions.get('window').width / 2.5,
    height: Dimensions.get('window').width / 3,
    borderWidth: 1,
    borderColor: theme.greyLight,
  },
  title: {
    fontSize: theme.mediumFontSize,
    color: theme.blackLight,
  },
  name: {
    alignSelf: 'center',
    paddingHorizontal: theme.gutter / 3,
    color: theme.white,
    fontSize: theme.smallFontSize,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: theme.greyLight,
    backgroundColor: theme.blackLight,
    width: Dimensions.get('window').width / 2.5,
  },
});

export default styles;
