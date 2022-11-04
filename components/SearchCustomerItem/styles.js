import {StyleSheet} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: theme.baseBorderColor,
    backgroundColor: theme.white,
    paddingVertical: theme.gutter / 2,
    paddingHorizontal: theme.gutter,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: theme.mediumFontSize,
    fontWeight: '300',
    color: theme.textPrimary,
    paddingBottom: theme.gutter / 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: theme.smallFontSize,
    color: theme.textSecondary,
    paddingLeft: theme.gutter / 2,
  },
  icon: {
    color: theme.blue,
    fontSize: theme.smallFontSize,
  },
  selectButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectButton: {
    fontSize: theme.mediumFontSize,
  },
});

export default styles;
