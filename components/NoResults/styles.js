import {StyleSheet} from 'react-native';

import {scale} from '../../helpers/scalling';
import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: theme.gutter * 2,
    padding: theme.gutter * 2,
  },
  icon: {
    fontSize: theme.noResultsIconFontSize,
    color: theme.colorPrimary,
  },
  image: {
    width: scale(80),
    height: scale(80),
  },
  text: {
    marginTop: theme.gutter,
    fontSize: theme.noResultsTextFontSize,
    textAlign: 'center',
    fontWeight: '300',
    fontFamily: theme.fontFamily,
    lineHeight: theme.noResultsTextFontSize + theme.gutter,
  },
});

export default styles;
