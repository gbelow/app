import {StyleSheet} from 'react-native';
import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.gutter,
    borderBottomWidth: 1,
    borderColor: theme.baseBorderColor,
    backgroundColor: '#FFF',
  },
  positionContainer: {
    flex: 0.5,
  },
  position: {
    fontSize: 16,
    color: theme.blue,
  },
  firstPosition: {
    fontSize: 20,
    color: theme.yellow,
  },
  avatarContainer: {
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  infoContainer: {
    flex: 2,
    flexDirection: 'column',
  },
  nameText: {
    color: theme.textPrimary,
    fontSize: theme.mediumFontSize,
  },
  pointsText: {
    color: theme.textSecondary,
    fontSize: theme.baseFontSize,
    fontWeight: '500',
  },
  detailsContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  icon: {
    width: 30,
    height: 30,
    right: 10,
  },
});

export default styles;
