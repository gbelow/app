import {StyleSheet, Dimensions} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 5000,
    backgroundColor: theme.toastBackgroundColor,
    width:
      Dimensions.get('window').width - (theme.toastLeft + theme.toastRight),
    left: theme.toastLeft,
    borderRadius: theme.toastBorderRadius,
    padding: theme.toastInnerPadding,
  },
  containerPositionTop: {
    top: theme.toastTop,
  },
  containerPositionBottom: {
    bottom: theme.toastBottom,
  },
  containerPositionMiddle: {
    bottom: theme.toastBottom,
  },
  inner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  messageContainer: {},
  messageText: {
    color: theme.toastTextColor,
    fontSize: theme.toastTextFontSize,
  },
  closeContainer: {},
  closeText: {
    color: theme.toastTextColor,
    fontSize: theme.toastTextFontSize,
  },
});

export default styles;
