import React from 'react';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, Text, Alert, StatusBar} from 'react-native';

import {
  Avatar,
  StatusBadge,
  Stars,
  NewSaleButton,
  ActionsModal,
  NavigationBar,
  Toast,
  HeaderButton,
} from '../../config/components';

import {navigate} from '../../actions/navigateActions';
import {actionRequest} from '../../actions/actionActions';
import images from '../../const/images';
import theme from '../../const/theme';
import styles from './styles';

class ScratchCard extends React.Component {
  toastTimeout = null;

  state = {
    showActionsModal: false,
    showToast: false,
  };

  static navigationOptions = () => ({
    header: null,
    tabBarLabel: 'Início',
    tabBarIcon: ({tintColor}) => (
      <Icon name="dashboard" color={tintColor} size={18} />
    ),
  });

  componentDidMount() {
    this.props.navigation.setParams({
      session: this.props.session,
      action: this.props.action,
      toggleActionsModal: this.toggleActionsModal.bind(this),
    });
  }

  /**
   * @name toggleActionsModal
   * @description toggle action modal
   * @return {Void}
   */
  toggleActionsModal() {
    this.setState({
      showActionsModal: !this.state.showActionsModal,
    });
  }

  /**
   * @name handleChangeAction
   * @description callback when user changes action
   * @param {Object} action
   * @return {Void}
   */
  handleChangeAction(action) {
    this.props.changeAction(action);

    this.props.navigation.setParams({
      action: {
        data: action,
      },
    });

    this.toggleActionsModal();

    this.setState({showToast: true});
    this.toastTimeout = setTimeout(this.hideToast.bind(this), 3000);
  }

  hideToast() {
    clearTimeout(this.toastTimeout);
    this.setState({showToast: false});
  }

  alertNotifications = () => {
    Alert.alert('Atenção', 'Você não possui prêmios pendentes!', [
      {text: 'OK'},
    ]);
  };

  render() {
    const {session, action} = this.props;

    const pendingPrizes = action.data.prizes.length;

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={theme.statusBarBackground}
          hidden={false}
        />
        {this.state.showToast && (
          <Toast
            message="Campanha alterada"
            position="bottom"
            onCloseButtonPress={this.hideToast.bind(this)}
          />
        )}
        {session && session.data && action && action.data && (
          <View>
            <NavigationBar
              left={
                <HeaderButton
                  navigation={this.props.navigation}
                  routeName="Home"
                  icon="home"
                  iconStyle={{
                    color: theme.grey,
                  }}
                />
              }
              center={
                <HeaderButton label={this.props.action.data.description} />
              }
              right={
                <HeaderButton
                  icon="bell-o"
                  label={pendingPrizes.toString()}
                  labelStyle={styles.notifications}
                  navigation={pendingPrizes ? this.props.navigation : null}
                  routeName={pendingPrizes ? 'Prizes' : null}
                  onPress={
                    !pendingPrizes ? this.alertNotifications.bind(this) : null
                  }
                />
              }
            />
            <View style={styles.mainContainer}>
              <View style={styles.userContainer}>
                <StatusBadge
                  image={images.trophy}
                  value={action.data.rankingPosition}
                  label="Ranking"
                />
                <Avatar
                  size="big"
                  name={session.data.user.name}
                  image={`https://graph.facebook.com/${session.data.user.userId}/picture?type=large`}
                />
                <StatusBadge
                  image={images.prize}
                  value={action.data.prizeCount}
                  label="prêmios"
                  onPress={() => this.props.navigate({routeName: 'Prizes'})}
                />
              </View>
              <View style={styles.starsContainer}>
                <Text style={styles.level}>
                  Nível {action.data.level.description}
                </Text>
                <Stars
                  level={action.data.level.code}
                  total={parseInt(action.data.levelPoints)}
                  maxLength={action.data.pointsNeeded}
                  style={{padding: 2}}
                />
              </View>
              <View style={styles.buttonContainer}>
                <NewSaleButton
                  radius={true}
                  onPress={() => this.props.navigate({routeName: 'NewSale'})}
                />
              </View>
              {this.state.showActionsModal && (
                <ActionsModal
                  actions={this.props.session.data.actions}
                  currentAction={this.props.action.data}
                  visible={this.state.showActionsModal}
                  onChangeAction={this.handleChangeAction.bind(this)}
                  onClose={this.toggleActionsModal.bind(this)}
                />
              )}
            </View>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({session, action}) => ({
  session,
  action,
});

const mapDispatchToProps = (dispatch) => ({
  changeAction: (action) => {
    dispatch(actionRequest(action));
  },
  navigate: (data) => {
    dispatch(navigate(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ScratchCard);
