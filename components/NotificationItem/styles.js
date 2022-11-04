import {StyleSheet} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: theme.gutter,
    borderBottomWidth: 1,
    borderColor: theme.baseBorderColor,
    backgroundColor: '#FFF',
  },
  containerNotRead: {
    backgroundColor: '#F7F7F7',
  },
  notRead: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    backgroundColor: theme.red,
    position: 'absolute',
    right: theme.gutter,
    bottom: theme.gutter,
  },
  kindContainer: {
    paddingRight: theme.gutter,
  },
  kindIconContainer: {
    marginLeft: theme.gutter / 2,
    height: theme.gutter * 4,
    width: theme.gutter * 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.baseBorderRadius,
    backgroundColor: theme.hoverColorPrimary,
  },
  kindIcon: {
    fontSize: 32,
    color: theme.white,
  },
  infoContainer: {
    flex: 2,
  },
  titleText: {
    fontSize: theme.smallFontSize,
    marginBottom: theme.gutter / 3,
    color: theme.textPrimary,
    fontWeight: '300',
    backgroundColor: 'transparent',
  },
  descriptionText: {
    color: theme.textSecondary,
    fontSize: theme.smallFontSize,
    textAlign: 'justify',
  },
  whenContainer: {
    flexDirection: 'row',
    paddingBottom: theme.gutter / 4,
    alignItems: 'center',
  },
  whenText: {
    fontSize: theme.extraSmallFontSize,
    color: theme.blackLight,
    paddingLeft: theme.gutter / 4,
  },
  whenIcon: {
    fontSize: theme.extraSmallFontSize,
    color: theme.blackLight,
  },
});

export default styles;
