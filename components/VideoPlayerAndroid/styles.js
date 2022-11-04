import {StyleSheet, Dimensions} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.blackLight,
  },
  video: {
    height: Dimensions.get('window').height - 21,
  },
});

export default styles;
