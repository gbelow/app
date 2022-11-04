import {StyleSheet, Dimensions} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    backgroundColor: theme.white,
    borderRadius: theme.gutter,
  },
  imageContainer: {
    minWidth: Dimensions.get('window').width / 1.2,
    minHeight: Dimensions.get('window').height / 2,
  },
  image: {
    width: Dimensions.get('window').width / 1.2,
    height: Dimensions.get('window').height / 2,
    marginTop: theme.gutter,
  },
  coverImage: {
    position: 'absolute',
    width: Dimensions.get('window').width / 1.2,
    height: Dimensions.get('window').height / 2,
    top: theme.gutter,
  },
  preventImage: {
    width: 0,
    height: 0,
  },
  blur: {
    position: 'absolute',
    top: theme.gutter,
    left: 0,
    bottom: 0,
    right: 0,
    minWidth: Dimensions.get('window').width / 1.2,
  },
  descriptionContainer: {
    alignItems: 'center',
    padding: theme.gutter,
    marginHorizontal: theme.gutter,
    borderBottomWidth: 0.5,
    borderColor: theme.baseBorderColor,
  },
  descriptionText: {
    fontSize: theme.mediumFontSize,
    color: theme.textPrimary,
  },
  scratchInstructionsText: {
    paddingTop: theme.gutter / 2,
    fontSize: theme.baseFontSize,
    color: theme.textSecondary,
  },
  customOptionsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.gutter,
    paddingHorizontal: theme.gutter,
    width: Dimensions.get('window').width / 1.2,
    height: Dimensions.get('window').height / 2,
  },
  optionsTitle: {
    fontSize: theme.mediumFontSize,
    color: theme.blackLight,
    fontWeight: '500',
    paddingVertical: theme.gutter / 2,
  },
  optionContainer: {
    flexDirection: 'row',
    minWidth: Dimensions.get('window').width / 1.2 - theme.gutter,
    paddingHorizontal: theme.gutter / 2,
    paddingVertical: theme.gutter,
    borderBottomWidth: 1,
    borderColor: theme.greyLight,
  },
  optionDescription: {
    fontSize: theme.mediumFontSize,
    paddingLeft: theme.gutter / 3,
    color: theme.grey,
  },
  angleIcon: {
    position: 'absolute',
    alignSelf: 'center',
    left: 0,
    fontWeight: '500',
    color: theme.yellow,
    fontSize: theme.bigFontSize,
  },
  scracthContainer: {
    position: 'relative',
  },
  scratchDescription: {
    width: Dimensions.get('window').width / 1.2,
    height: Dimensions.get('window').height / 2,
    position: 'absolute',
    justifyContent: 'center',
  },
  scratchDescriptionTitle: {
    textAlign: 'center',
    color: theme.blackLight,
    fontWeight: '500',
    fontSize: theme.biggerFontSize,
    padding: theme.biggerFontSize * 2,
  },
  textLinkContainer: {
    alignItems: 'center',
  },
  stars: {
    paddingHorizontal: 2,
  },
});

export default styles;
