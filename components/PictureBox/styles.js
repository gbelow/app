import {StyleSheet, Dimensions} from 'react-native';

import {scale} from '../../helpers/scalling';
import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width / 2 - theme.gutter * 3,
    height: Dimensions.get('window').width / 2 - theme.gutter * 3,
    margin: theme.gutter,
    backgroundColor: theme.greyLight,
    borderRadius: theme.baseBorderRadius,
  },
  photoIcon: {
    fontSize: scale(50),
    color: theme.grey,
  },
  description: {
    textAlign: 'center',
    fontSize: theme.smallFontSize,
    color: theme.blackLight,
    paddingTop: theme.gutter,
  },
  preview: {
    width: Dimensions.get('window').width / 2 - theme.gutter * 3,
    height: Dimensions.get('window').width / 2 - theme.gutter * 3,
    borderRadius: theme.baseBorderRadius,
  },
  cancelButton: {
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.white,
    width: scale(40),
    height: scale(40),
    borderBottomLeftRadius: theme.baseBorderRadius,
    borderTopRightRadius: theme.baseBorderRadius,
  },
  cancelIcon: {
    fontSize: theme.mediumFontSize,
    color: theme.red,
  },
});

export default styles;
