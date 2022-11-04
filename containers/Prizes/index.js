import React from 'react';
import {connect} from 'react-redux';

import {View, FlatList} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Grid,
  GridItem,
  NoResults,
  NoConnection,
  GridStatus,
  DetailItem,
  DetailModal,
  Achievement,
  AchievementModal,
} from '../../config/components';

import {prizesRequest, prizeConfirmRequest} from '../../actions/prizeActions';

import images from '../../const/images';
import theme from '../../const/theme';
import styles from './styles';

class Prizes extends React.Component {
  state = {
    item: null,
    showDetailModal: false,
    showAchievementModal: false,
  };

  static navigationOptions = () => ({
    title: 'Prêmios',
    headerRight: <View />,
    tabBarLabel: 'Prêmios',
    tabBarIcon: ({tintColor}) => (
      <Icon name="gift" color={tintColor} size={20} />
    ),
  });

  componentDidMount() {
    this.props.loadPrizes({
      user: this.props.session.data.user,
      action: this.props.action.data,
    });
  }

  /**
   * @name fullAddress
   * @description indicate the address where the price will be delivered
   * @return {String}
   * */
  get fullAddress() {
    const {address} = this.props.session.data.company;
    return `${address.street}, ${address.neighborhood} - n ${address.number}`;
  }
  /**
   * @name toggleDetailModal
   * @description change DetailModal visibility
   * @param {Object} item
   * @return {Void}
   */
  toggleDetailModal(item) {
    this.setState({
      item,
      showDetailModal: !this.state.showDetailModal,
    });
  }

  /**
   * @name toggleAchievementModal
   * @description controls AchievementModal visibility
   * @return {Void}
   */
  toggleAchievementModal() {
    this.setState({
      showAchievementModal: !this.state.showAchievementModal,
    });
  }

  /**
   * @name pendingPrizes
   * @description get pending prizes
   * @return {Void}
   */
  get pendingPrizes() {
    return this.props.action.data.prizes;
  }

  /**
   * @name handlePrizeConfirm
   * @description handle prize confirmation
   * @params {Object} data with prize and option
   * @return {Void}
   */
  handlePrizeConfirm(data) {
    this.toggleAchievementModal();
    this.props.confirmPrize(data);
  }

  /**
   * @name renderPrizeItem
   * @description return item from user prizes list
   * @param {Object} item
   * @return {React.Component} Grid with children
   */
  renderPrizeItem({item}) {
    if (item.confirmed) {
      return (
        <Grid onPress={this.toggleDetailModal.bind(this, item)}>
          <GridItem label="Prêmio" value={item.description} />
          <GridItem label="Data" value={item.dateEarned.split(' ')[0]} />
          <GridStatus label={item.confirmed ? 'Confirmado' : 'Pendente'} />
        </Grid>
      );
    }
  }

  render() {
    const {item, showDetailModal} = this.state;
    const {prizes} = this.props;

    return (
      <View style={styles.container}>
        {this.pendingPrizes.length > 0 && (
          <Achievement onPress={this.toggleAchievementModal.bind(this)} />
        )}
        <FlatList
          data={prizes && prizes.data}
          renderItem={this.renderPrizeItem.bind(this)}
          keyExtractor={(item) => item.prizeId}
          ListEmptyComponent={() => {
            if (
              prizes.data &&
              prizes.data.length === 0 &&
              this.pendingPrizes.length === 0
            ) {
              return (
                <NoResults
                  image={images.prize}
                  text="Você ainda não possui prêmios"
                />
              );
            } else if (!this.props.connection) {
              return <NoConnection />;
            }

            return null;
          }}
        />
        {this.state.showAchievementModal && (
          <AchievementModal
            onConfirm={this.handlePrizeConfirm.bind(this)}
            onClose={this.toggleAchievementModal.bind(this)}
            visible={this.state.showAchievementModal}
            blurAmount={30}
            prize={this.pendingPrizes[0]}
            action={this.props.action}
          />
        )}
        {item && item.confirmed && showDetailModal && (
          <DetailModal
            title={item.description}
            icon="gift"
            iconColor={theme.red}
            visible={showDetailModal}
            onClose={this.toggleDetailModal.bind(this)}>
            {item.confirmed && (
              <View>
                <DetailItem label="Prêmio" value={item.description} />
                <DetailItem label="Data" value={item.dateEarned} />
                <DetailItem
                  label="End. de Entrega"
                  value={this.fullAddress.toLowerCase()}
                />
                <DetailItem
                  label="Detalhes"
                  value={item.product.description.toLowerCase()}
                />
              </View>
            )}
          </DetailModal>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({prizes, action, session, connection}) => ({
  prizes,
  action,
  session,
  connection,
});

const mapDispatchToProps = (dispatch) => ({
  loadPrizes(data) {
    dispatch(prizesRequest(data));
  },
  confirmPrize(data) {
    dispatch(prizeConfirmRequest(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Prizes);
