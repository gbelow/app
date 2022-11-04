import {StyleSheet, Dimensions} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    margin: theme.gutter / 2,
  },
  codeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width / 2 - theme.gutter * 2,
    height: Dimensions.get('window').width / 3,
    backgroundColor: '#eee',
  },
  basketImage: {
    width: Dimensions.get('window').width / 10,
    height: Dimensions.get('window').width / 10,
  },
  ticketText: {
    color: theme.blackLight,
    fontSize: theme.extraSmallFontSize,
    paddingHorizontal: theme.gutter,
    paddingTop: theme.gutter / 2,
  },
  total: {
    alignSelf: 'center',
    color: theme.blackLight,
    fontSize: theme.smallFontSize,
    fontWeight: 'bold',
    paddingTop: theme.gutter / 2,
  },
  deleteContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  deleteTouch: {
    padding: theme.gutter / 1.5,
  },
  deleteIcon: {
    fontSize: 16,
    color: theme.blackLight,
  },
});

export default styles;
