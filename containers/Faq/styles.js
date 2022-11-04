import {StyleSheet, Dimensions} from 'react-native';
import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
  headerContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    backgroundColor: theme.colorPrimary,
  },
  headerTitle: {
    padding: theme.gutter,
    color: theme.white,
    fontSize: theme.mediumFontSize,
    fontWeight: '300',
  },
  buttonsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  },
  button: {
    backgroundColor: theme.whiteDarken,
    borderTopWidth: 1,
    borderColor: theme.greyLight,
  },
  buttonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width / 2,
    height: theme.gutter * 4,
  },
  buttonLeft: {
    borderRightWidth: 1,
    borderColor: theme.greyLight,
  },
  buttonIcon: {
    fontSize: theme.mediumFontSize,
    marginRight: theme.gutter / 2,
    color: theme.textPrimary,
  },
  buttonText: {
    fontSize: theme.smallFontSize,
    color: theme.textPrimary,
  },
});

export default styles;
