import {StyleSheet, Dimensions} from 'react-native';
import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bodyBackgroundColor,
  },
  inputContainer: {
    paddingHorizontal: theme.gutter,
    paddingTop: theme.gutter,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  preview: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Dimensions.get('window').width,
  },
  captureButton: {
    position: 'absolute',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.white,
    bottom: theme.gutter,
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  cameraButtons: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    bottom: theme.gutter,
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
  },
  nextButton: {
    position: 'absolute',
    right: theme.gutter,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.greyLight,
    width: 40,
    height: 40,
    borderRadius: 3,
  },
  nextIcon: {
    fontSize: theme.biggerFontSize,
    color: theme.blueDark,
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.white,
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  sendButton: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.blackLight,
    width: Dimensions.get('window').width,
    padding: theme.gutter,
  },
  sendButtonText: {
    fontSize: theme.mediumFontSize,
    color: theme.whiteDarken,
  },
  cancelIcon: {
    color: theme.red,
    fontSize: theme.bigFontSize,
  },
  galleryButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.greyLight,
    width: 40,
    height: 40,
    borderRadius: 3,
    left: theme.gutter,
    bottom: 0,
  },
  galleryIcon: {
    color: theme.blueDark,
    fontSize: theme.bigFontSize,
  },
});

export default styles;
