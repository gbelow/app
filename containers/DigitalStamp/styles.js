import {StyleSheet, Dimensions} from 'react-native';
import theme from '../../const/theme';
import {scale} from '../../helpers/scalling';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  stampContainer: {
    position: 'absolute',
    alignSelf: 'center',
  },
  stamp: {
    width: scale(140),
    height: scale(140),
  },
  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    width: Dimensions.get('window').width,
    backgroundColor: theme.whiteDarken,
  },
  menuContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: scale(70),
    width: Dimensions.get('window').width / 3,
    padding: theme.gutter,
  },
  menuLeft: {
    borderRightWidth: 1,
    borderRightColor: theme.greyLight,
  },
  menuRight: {
    borderLeftWidth: 1,
    borderLeftColor: theme.greyLight,
  },
  circle: {
    width: theme.gutter * 2,
    height: theme.gutter * 2,
    borderRadius: theme.gutter,
    margin: theme.gutter / 2,
    borderColor: theme.grey,
    borderWidth: 2,
  },
  optionsIcon: {
    fontSize: theme.biggerFontSize,
    padding: theme.gutter / 1.5,
    color: theme.blackLight,
  },
  iconInverted: {
    fontSize: theme.biggerFontSize,
    padding: theme.gutter / 1.5,
    color: theme.blackLight,
    transform: [{rotate: '90deg'}],
  },
  border: {
    width: 2,
    borderRightWidth: 2,
    borderRightColor: theme.blackLight,
  },
  menuIcon: {
    fontSize: theme.mediumFontSize,
    color: theme.blackLight,
  },
  stampPreviewImage: {
    width: scale(50),
    height: scale(50),
    borderRadius: theme.baseBorderRadius,
    borderWidth: 2,
    borderColor: theme.greyLight,
  },
  gesturesContainer: {
    top: scale(220),
    width: scale(150),
    height: scale(230),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'center',
  },
  noStampContainer: {
    position: 'absolute',
    top: scale(220),
    alignSelf: 'center',
  },
  noStampIcon: {
    fontSize: scale(130),
    color: theme.blue,
  },
  colorsColumn: {
    position: 'absolute',
    backgroundColor: theme.greyLight,
    bottom: scale(75),
    left: scale(28),
    borderRadius: theme.baseBorderRadius,
    padding: theme.gutter / 2,
  },
  alignColumn: {
    position: 'absolute',
    backgroundColor: theme.greyLight,
    bottom: scale(75),
    right: scale(28),
    borderRadius: theme.baseBorderRadius,
    padding: theme.gutter / 2,
  },
});

export default styles;
