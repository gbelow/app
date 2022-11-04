import {StyleSheet, Dimensions} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    width: Dimensions.get('window').width / 1.2,
    maxHeight: Dimensions.get('window').height,
    backgroundColor: theme.white,
    borderRadius: theme.gutter / 5,
  },
  titleContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingTop: theme.gutter,
  },
  title: {
    fontSize: theme.mediumFontSize,
    color: theme.blackLight,
    paddingLeft: theme.gutter / 2,
  },
  dataContainer: {
    paddingVertical: theme.gutter,
    padding: theme.gutter / 2,
    borderBottomWidth: 0.5,
    borderColor: theme.baseBorderColor,
  },
  image: {
    width: 20,
    height: 20,
  },
  closeButtonContainer: {
    alignItems: 'center',
  },
});

export default styles;
