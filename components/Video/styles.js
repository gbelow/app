import {StyleSheet, Dimensions} from 'react-native';

import theme from '../../const/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  thumbContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width / 1.5,
  },
  playIconContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    color: theme.white,
    fontSize: 40,
  },
});

export default styles;
