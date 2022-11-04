import React from 'react';
import {connect} from 'react-redux';
import {View, Text, FlatList, Switch} from 'react-native';

import {Stars, Grid, GridItem, ActionTermsModal} from '../../config/components';

import {Touch} from 'react-native-kin-ui';

import {
  actionTermsRequest,
  actionSubscribeRequest,
  actionResetRequest,
} from '../../actions/actionActions';

import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../const/theme';
import styles from './styles';

class Lottery extends React.Component {
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

  renderCupomItem = ({item}) => (
    <Grid>
      <GridItem label="Cupom" value={item.number} />
      <GridItem label="Data" value={item.date} />
    </Grid>
  );

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
          <Text style={styles.title}>Descrição</Text>
          <View style={styles.descriptionContainer}>
            <WebView source={{html: action.data.description}} />
          </View>
          <Text style={styles.title}>Suas Estrelas</Text>
          {action.data.level && (
            <Stars
              level={action.data.level.code}
              total={parseInt(action.data.levelPoints)}
              maxLength={action.data.pointsNeeded}
              style={{
                fontSize: theme.mediumFontSize,
                margin: 2,
              }}
            />
          )}
          <Text style={styles.title}>Seus Cupons</Text>
          <FlatList
            data={action.data.coupons}
            extraData={this.props}
            renderItem={this.renderCupomItem.bind(this)}
            keyExtractor={(item) => item.number}
            style={styles.prizesList}
            ListEmptyComponent={() => {
              if (
                action.data &&
                action.data.coupons &&
                action.data.coupons.length === 0
              ) {
                return (
                  <Text style={styles.noCoupons}>Você não possui cupons</Text>
                );
              }
              return null;
            }}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(Lottery);
