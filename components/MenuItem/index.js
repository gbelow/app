import React from 'react';
import {View, Text, Image} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Touch} from 'react-native-kin-ui';
import Icon from 'react-native-vector-icons/FontAwesome';

import {customNavigate} from '../../actions/navigateActions';
import theme from '../../const/theme';

import styles from './styles';

class MenuItem extends React.Component {
  static propTypes = {
    menu: PropTypes.object.isRequired,
  };

  hasSubMenu({submenus}) {
    if (submenus && submenus.length > 0) {
      return true;
    }

    return false;
  }

  handleNavigateAction() {
    const {menu, handlePress} = this.props;

    if (this.hasSubMenu(menu)) {
      handlePress(menu.submenus);
      return;
    }

    this.props.customNavigate(menu);
  }

  render() {
    const {menu, position} = this.props;

    if (position === 'grid') {
      return (
        <View style={styles.gridContainer}>
          <Touch onPress={() => this.handleNavigateAction()}>
            <View style={styles.gridInner}>
              {menu.image && (
                <Image source={menu.image} style={styles.gridImage} />
              )}
              {!menu.image && menu.icon && (
                <View>
                  <Icon name={menu.icon} style={styles.gridIcon} />
                  <Text numberOfLines={1} style={styles.gridText}>
                    {theme.isMenuOnUpperCase
                      ? menu.name.toUpperCase()
                      : menu.name}
                  </Text>
                </View>
              )}
            </View>
          </Touch>
        </View>
      );
    }

    return (
      <Touch onPress={() => this.handleNavigateAction()}>
        <View style={styles.sideContainer}>
          <Icon name={menu.icon} style={styles.sideIcon} />
          <Text style={styles.sideText}>{menu.name}</Text>
          {this.props.badge > 0 && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{this.props.badge}</Text>
            </View>
          )}
        </View>
      </Touch>
    );
  }
}

const mapStateToProps = ({session}) => ({
  session,
});

const mapDispatchToProps = (dispatch) => ({
  customNavigate: (data) => {
    dispatch(customNavigate(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem);
