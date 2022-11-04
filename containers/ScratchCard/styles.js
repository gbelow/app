import {StyleSheet} from 'react-native';
import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bodyBackgroundColor,
    alignItems: 'center',
  },
  mainContainer: {
    flex: 1,
    paddingTop: theme.gutter,
  },
  userContainer: {
    padding: theme.gutter,
    flexDirection: 'row',
  },
  starsContainer: {
    alignItems: 'center',
    padding: theme.gutter,
  },
  level: {
    color: theme.grey,
    fontWeight: '300',
    paddingBottom: theme.gutter / 2,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: theme.gutter,
  },
  headerIcon: {
    bottom: 4,
  },
});

export default styles;
