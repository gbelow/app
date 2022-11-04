import {StyleSheet, Dimensions} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.gutter / 2,
    backgroundColor: theme.bodyBackgroundColor,
    justifyContent: 'center',
  },
  gift: {
    alignSelf: 'center',
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2,
  },
  detailItem: {
    padding: theme.gutter / 2,
    borderBottomWidth: 0.5,
    borderColor: theme.baseBorderColor,
  },
});

export default styles;
