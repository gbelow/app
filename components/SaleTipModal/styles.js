import {StyleSheet, Dimensions} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    backgroundColor: theme.white,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    width: Dimensions.get('window').width,
    backgroundColor: theme.white,
    borderTopWidth: 1,
    borderColor: theme.greyLight,
  },
  saleTip: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
});

export default styles;
