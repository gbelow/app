import {StyleSheet, Dimensions} from 'react-native';
import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    padding: theme.gutter,
    alignSelf: 'center',
    alignItems: 'center',
  },
  termsContainer: {
    flexDirection: 'row',
  },
  termsTextContainer: {
    marginLeft: theme.gutter / 2,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  linkText: {
    color: theme.blue,
    fontSize: theme.smallFontSize,
  },
  termsText: {
    color: theme.blackLight,
    fontSize: theme.smallFontSize,
  },
  radioContainer: {
    paddingBottom: theme.gutter / 2,
  },
  radioLabel: {
    paddingRight: theme.gutter,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5000,
  },
  modalInner: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: theme.white,
    borderRadius: theme.baseBorderRadius,
  },
  modalButtonContainer: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    width: Dimensions.get('window').width,
    paddingBottom: theme.gutter * 2,
    backgroundColor: theme.white,
    borderTopWidth: 1,
    borderColor: theme.greyLight,
  },
  pdf: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
});

export default styles;
