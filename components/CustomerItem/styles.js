import {StyleSheet} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: theme.baseBorderColor,
    backgroundColor: theme.white,
  },
  mainContainer: {
    flexDirection: 'row',
    paddingLeft: theme.gutter,
  },
  nameContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  name: {
    fontSize: theme.baseFontSize,
    fontWeight: '300',
    color: theme.textPrimary,
    fontFamily: theme.fontFamily,
  },
  touchButton: {
    padding: theme.gutter,
    fontSize: theme.mediumFontSize,
  },
  infoContainer: {
    paddingLeft: theme.gutter,
    paddingBottom: theme.gutter,
  },
  infoRow: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: theme.gutter / 2,
    fontSize: theme.baseFontSize,
    color: theme.textSecondary,
    fontFamily: theme.fontFamily,
  },
  icon: {
    color: theme.blue,
    fontSize: theme.mediumFontSize,
  },
});

export default styles;
