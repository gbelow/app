import {StyleSheet, Dimensions} from 'react-native';

import {scale} from '../../helpers/scalling';
import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  inner: {
    width: Dimensions.get('window').width - theme.gutter * 2,
    maxHeight: Dimensions.get('window').height / 2,
    borderRadius: theme.baseBorderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.gutter,
    backgroundColor: theme.whiteDarken,
    borderColor: theme.baseBorderColor,
    borderWidth: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: theme.baseBorderColor,
    width: Dimensions.get('window').width,
    marginBottom: theme.gutter / 2,
  },
  title: {
    fontSize: theme.bigFontSize,
    color: theme.blackLight,
    fontWeight: '500',
    paddingBottom: theme.gutter,
  },
  folderContainer: {
    padding: theme.gutter / 2,
    borderBottomWidth: 1,
    borderBottomColor: theme.baseBorderColor,
    marginBottom: theme.gutter / 2,
    width: Dimensions.get('window').width - theme.gutter * 2,
  },
  folderName: {
    fontSize: theme.mediumFontSize,
    color: theme.textPrimary,
  },
  closeButtonContainer: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: theme.baseBorderColor,
    width: Dimensions.get('window').width,
  },
});

export default styles;
