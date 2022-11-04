import {StyleSheet, Dimensions} from 'react-native';

import {scale} from '../../helpers/scalling';
import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.gutter,
    marginBottom: theme.gutter,
    backgroundColor: theme.blackLight,
    height: Dimensions.get('window').width / 4,
    width: Dimensions.get('window').width / 2 - theme.gutter * 2,
  },
  itemLeft: {
    marginRight: theme.gutter,
  },
  itemRight: {
    marginLeft: theme.gutter,
  },
  codeIcon: {
    color: theme.white,
    fontSize: scale(60),
  },
  codeText: {
    color: theme.white,
    fontSize: theme.smallFontSize,
  },
  deleteContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  deleteTouch: {
    padding: theme.gutter / 2,
  },
  deleteIcon: {
    fontSize: scale(16),
    color: theme.white,
  },
});

export default styles;
