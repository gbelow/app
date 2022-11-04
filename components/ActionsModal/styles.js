import {StyleSheet, Dimensions} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5000,
  },
  inner: {
    width: Dimensions.get('window').width / 1.2,
    backgroundColor: theme.white,
    borderRadius: theme.gutter,
    padding: theme.gutter,
  },
  title: {
    fontSize: theme.mediumFontSize,
    color: theme.blackLight,
    fontWeight: '500',
    textAlign: 'center',
    paddingBottom: theme.gutter,
  },
  actionContainer: {
    flexDirection: 'row',
    borderRadius: theme.baseBorderRadius,
  },
  actionText: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: theme.greyLight,
    paddingHorizontal: theme.gutter / 2,
    paddingVertical: theme.gutter,
    color: theme.textPrimary,
  },
  actionTextSelected: {
    backgroundColor: '#F5F7F9',
    fontWeight: '500',
  },
  arrowIcon: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    right: theme.gutter,
    fontSize: 16,
  },
  arrowIconSelected: {
    color: theme.yellow,
  },
});

export default styles;
