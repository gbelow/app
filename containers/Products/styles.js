import {StyleSheet, Dimensions} from 'react-native';
import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bodyBackgroundColor,
  },
  inputContainer: {
    backgroundColor: theme.searchBackgroundContainer,
    padding: theme.gutter,
    paddingBottom: theme.gutter / 2,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.greyLight,
    paddingVertical: theme.gutter / 2,
    paddingLeft: theme.gutter,
  },
  itemText: {
    fontSize: theme.mediumFontSize,
    color: theme.blackLight,
    width: Dimensions.get('window').width / 1.3,
  },
  indicatorRight: {
    fontSize: theme.smallFontSize,
    color: theme.yellow,
    paddingRight: theme.gutter / 3,
  },
  infoIcon: {
    fontSize: theme.mediumFontSize,
    color: theme.grey,
    position: 'absolute',
    right: theme.gutter,
    alignSelf: 'center',
  },
  title: {
    fontSize: theme.smallFontSize,
    color: theme.textSecondary,
    borderBottomColor: theme.greyLight,
    borderBottomWidth: 1,
    padding: theme.gutter,
  },
  productsContainer: {
    flex: 1,
  },
  backContainer: {
    backgroundColor: theme.blackLight,
    width: Dimensions.get('window').width,
    position: 'absolute',
    bottom: 0,
  },
  backText: {
    textAlign: 'center',
    fontSize: theme.smallFontSize,
    color: theme.white,
    padding: theme.gutter,
  },
});

export default styles;
