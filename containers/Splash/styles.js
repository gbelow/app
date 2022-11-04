import {StyleSheet, Dimensions} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bodyBackgroundColor,
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default styles;
