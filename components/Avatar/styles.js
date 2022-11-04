import {StyleSheet, Dimensions} from 'react-native';

import {scale} from '../../helpers/scalling';
import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  inner: {
    marginLeft: theme.gutter,
    alignItems: 'center',
  },
  imgContainer: {
    paddingVertical: theme.gutter / 2,
    paddingLeft: theme.gutter,
    alignItems: 'center',
    overflow: 'hidden',
  },
  img: {
    width: theme.headerAvatarSize,
    height: theme.headerAvatarSize,
    borderRadius: theme.headerAvatarSize / 2,
  },
  imgBig: {
    borderRadius: scale(65),
    width: scale(130),
    height: scale(130),
  },
  infoContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: theme.smallFontSize,
    fontWeight: '500',
    color: theme.avatarNameColor,
    fontFamily: theme.fontFamily,
  },
  nameBig: {
    paddingTop: theme.gutter / 2,
    fontSize: theme.mediumFontSize,
    color: theme.blackLight,
    fontFamily: theme.fontFamily,
  },
  company: {
    fontSize: theme.smallFontSize,
    color: theme.avatarCompanyColor,
    width: Dimensions.get('window').width / 2,
    fontFamily: theme.fontFamily,
  },
  city: {
    fontSize: theme.smallFontSize,
  },
});

export default styles;
