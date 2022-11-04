import {StyleSheet, Dimensions} from 'react-native';
import {appId} from '../../package.json';
import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoContainer: {
    paddingLeft: theme.gutter,
    paddingBottom: theme.gutter,
    borderBottomColor: theme.greyLight,
    borderBottomWidth: 1,
    paddingTop: appId === 'amc' ? theme.gutter : 0,
  },
  userInfoItem: {
    flexDirection: 'row',
  },
  infoLabel: {
    fontSize: theme.smallFontSize,
    color: theme.grey,
    fontFamily: theme.fontFamily,
  },
  infoValue: {
    fontSize: theme.smallFontSize,
    color: theme.darkGrey,
    fontFamily: theme.fontFamily,
  },
});

export default styles;
