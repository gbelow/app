import {StyleSheet} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: theme.gutter,
    marginBottom: theme.gutter,
  },
  image: {
    width: 250,
    height: 250,
    alignSelf: 'center',
  },
});

export default styles;
