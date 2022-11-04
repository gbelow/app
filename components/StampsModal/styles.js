import {StyleSheet, Dimensions} from 'react-native';

import {scale} from '../../helpers/scalling';
import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  inner: {
    width: Dimensions.get('window').width,
    maxHeight: Dimensions.get('window').height,
    borderRadius: theme.baseBorderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.gutter * 2,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: theme.baseBorderColor,
    width: Dimensions.get('window').width,
  },
  title: {
    fontSize: theme.bigFontSize,
    fontWeight: '500',
    paddingBottom: theme.gutter,
  },
  imageContainer: {
    margin: theme.gutter / 2,
    borderColor: theme.greyLight,
    borderWidth: 1,
    borderRadius: theme.baseBorderRadius,
  },
  image: {
    width: Dimensions.get('window').width / 2.5,
    height: Dimensions.get('window').width / 2.5,
  },
  closeButtonContainer: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: theme.baseBorderColor,
    width: Dimensions.get('window').width,
  },
});

export default styles;
