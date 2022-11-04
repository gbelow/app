import {StyleSheet, Platform} from 'react-native';

import {scale} from '../../helpers/scalling';
import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bodyBackgroundColor,
  },
  avatarContainer: {
    flexDirection: 'row',
    elevation: 1,
    alignItems: 'center',
    paddingHorizontal: theme.gutter,
    paddingVertical: theme.gutter / 2,
    backgroundColor: theme.blackLighter,
  },
  avatar: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
  },
  avatarInfoContainer: {
    flex: 1,
    paddingLeft: theme.gutter,
  },
  avatarName: {
    fontSize: theme.smallFontSize,
    color: theme.white,
    fontWeight: '500',
  },
  avatarCompany: {
    fontSize: theme.smallFontSize,
    color: theme.whiteDarken,
  },
  deleteButton: {
    flexDirection: 'row',
    padding: theme.gutter / 1.5,
    backgroundColor: theme.danger,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIcon: {
    color: theme.white,
    fontSize: theme.smallFontSize,
    paddingRight: theme.gutter / 2,
  },
  deleteText: {
    color: theme.white,
    fontSize: theme.mediunFontSize,
  },
  formContainer: {
    flex: 1,
    padding: theme.gutter,
  },
});

export default styles;
