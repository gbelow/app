import {Dimensions, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 5000,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    flexGrow: 1,
  },
});

export default styles;
