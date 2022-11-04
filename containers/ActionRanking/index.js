import React from 'react';
import {connect} from 'react-redux';
import {View, Text, Switch, Image} from 'react-native';

import {ActionTermsModal} from '../../config/components';

import {Touch} from 'react-native-kin-ui';

import {
  actionTermsRequest,
  actionSubscribeRequest,
  actionResetRequest,
} from '../../actions/actionActions';

import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';
import images from '../../const/images';
import styles from './styles';

class ActionRanking extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title,
    headerRight: <View />,
  });

  state = {
    termsAccepted: false,
    termsModalVisibility: false,
  };

  componentWillUnmount() {
    this.props.resetActionData();
  }

  /**
   * @name onSwitchChange
   * @description change switch
   * @return {Void}
   */
  onSwitchChange(termsAccepted) {
    this.setState({termsAccepted});

    this.props.actionSubscribeRequest();
  }

  /**
   * @name toggleActionTermsModal
   * @description focus the input
   * @return {Void}
   */
  toggleActionTermsModal() {
    this.setState({
      termsModalVisibility: !this.state.termsModalVisibility,
    });
  }

  render() {
    const {action} = this.props;

    if (action.data) {
      return (
        <View style={styles.container}>
          {!action.data.actionMember && (
            <View style={styles.actionSubscription}>
              <Text style={styles.title}>Inscreva-se</Text>
              <Text style={styles.description}>
                Ao concordar com os termos da campanha você poderá registrar
                suas vendas e concorrer a prêmios incríveis.
              </Text>
              <View style={styles.termsContainer}>
                <Switch
                  value={this.state.termsAccepted}
                  onValueChange={this.onSwitchChange.bind(this)}
                />
                <View style={styles.termsText}>
                  <Text>Concordo com os </Text>
                  <Touch onPress={this.toggleActionTermsModal.bind(this)}>
                    <Text style={styles.linkText}>Termos de Uso</Text>
                  </Touch>
                </View>
                {this.state.termsModalVisibility && (
                  <ActionTermsModal
                    action={action.data}
                    visible={this.state.termsModalVisibility}
                    onClose={this.toggleActionTermsModal.bind(this)}
                  />
                )}
              </View>
            </View>
          )}
          {action.data.actionMember && (
            <View style={styles.actionSubscription}>
              <Text style={styles.title}>Inscrição</Text>
              <View style={styles.checkIconContainer}>
                <Icon name="check-circle" style={styles.checkIcon} />
                <Text style={styles.subscriptionText}>
                  Você está inscrito nesta campanha!
                </Text>
              </View>
            </View>
          )}
          <View style={styles.pointsContainer}>
            <Text style={styles.title}>Seus pontos</Text>
            <View style={styles.totalPointsContainer}>
              <Text style={styles.points}>{action.data.totalPoints}</Text>
            </View>
          </View>
          <View style={styles.pointsContainer}>
            <Text style={styles.title}>Posição no ranking</Text>
            <View style={styles.totalPointsContainer}>
              <Text style={styles.points}>{action.data.rankingPosition}</Text>
              <Image source={images.bookmark} style={styles.trophy} />
            </View>
          </View>
          <Text style={styles.title}>Descrição</Text>
          <View style={styles.descriptionContainer}>
            <WebView source={{html: action.data.description}} />
          </View>
        </View>
      );
    }

    return <View />;
  }
}

const mapStateToProps = ({action, actionTerms}) => ({
  action,
  actionTerms,
});

const mapDispatchToProps = (dispatch) => ({
  actionSubscribeRequest: () => {
    dispatch(actionSubscribeRequest());
  },
  actionTermsRequest: (payload) => {
    dispatch(actionTermsRequest(payload));
  },
  resetActionData: () => {
    dispatch(actionResetRequest());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionRanking);
