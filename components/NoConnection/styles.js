import {StyleSheet, Dimensions} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: theme.gutter * 2,
    padding: theme.gutter * 2,
  },
  icon: {
    fontSize: Dimensions.get('window').width / 6,
    color: theme.colorPrimary,
  },
  text: {
    marginTop: theme.gutter,
    fontSize: theme.noResultsTextFontSize,
    textAlign: 'center',
    fontWeight: '300',
  },
});

export default styles;
