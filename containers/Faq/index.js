import React from 'react';
import {connect} from 'react-redux';
import {View, Text, FlatList, Alert, Platform} from 'react-native';

import {Touch} from 'react-native-kin-ui';

import {TopicItem, AlertModal, NoResults} from '../../config/components';

import Mailer from 'react-native-mail';
import Icon from 'react-native-vector-icons/FontAwesome';
import {faqRequest} from '../../actions/faqActions';
import images from '../../const/images';
import styles from './styles';

class Faq extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title,
    headerRight: <View />,
  });

  state = {
    showAlertModal: false,
  };

  componentDidMount() {
    this.props.loadFaq();
  }

  renderTopicItem({item}) {
    return <TopicItem description={item.description} items={item.items} />;
  }

  navigate(routeName) {
    this.props.navigation.navigate(routeName);
  }

  openMailer() {
    Mailer.mail(
      {
        recipients: [this.props.faq.data.config.helpEmail],
        ccRecipients: ['suporte@kincode.com.br'],
      },
      (sendError, event) => {
        error = true;

        if (Platform.OS === 'ios' && sendError === 'not_available') {
          this.toggleAlertModal();
        }
      },
    );
  }

  toggleAlertModal() {
    this.setState({
      showAlertModal: !this.state.showAlertModal,
    });
  }

  render() {
    const {faq} = this.props;

    return (
      <View style={styles.container}>
        {faq.data && faq.data.topics && (
          <View style={styles.topicsContainer}>
            <FlatList
              data={faq.data.topics}
              renderItem={this.renderTopicItem.bind(this)}
              keyExtractor={(item, index) => index}
              ListEmptyComponent={() => {
                if (faq.data && faq.data.length === 0) {
                  return (
                    <NoResults
                      image={images.products}
                      text="Não há registros"
                    />
                  );
                }
                return null;
              }}
            />
          </View>
        )}
        {faq.data && (
          <View style={styles.buttonsContainer}>
            {faq.data.config && faq.data.config.enableChat && (
              <View style={[styles.button, styles.buttonLeft]}>
                <Touch onPress={this.navigate.bind(this, 'Chat')}>
                  <View style={styles.buttonInner}>
                    <Icon
                      name="comment-o"
                      style={[styles.buttonIcon, styles.chatIcon]}
                    />
                    <Text style={styles.buttonText}>Chat</Text>
                  </View>
                </Touch>
              </View>
            )}
            {faq.data.config && faq.data.config.enableEmail && (
              <View
                style={
                  faq.data.config.enableChat
                    ? styles.button
                    : [styles.button, styles.buttonLeft]
                }>
                <Touch onPress={this.openMailer.bind(this)}>
                  <View style={styles.buttonInner}>
                    <Icon
                      name="envelope-o"
                      style={[styles.buttonIcon, styles.emailIcon]}
                    />
                    <Text style={styles.buttonText}>Email</Text>
                  </View>
                </Touch>
              </View>
            )}
            <AlertModal
              title="Caro usuário"
              description="Para utilizar esta função, você deve ter uma conta de email vinculada ao Mail, app que já vem instalado ao seu dispositivo. Caso tenha excluído entre no link abaixo:"
              link="https://itunes.apple.com/br/app/mail/id1108187098?mt=8"
              visible={this.state.showAlertModal}
              onClose={this.toggleAlertModal.bind(this)}
            />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({faq}) => ({
  faq,
});

const mapDispatchToProps = (dispatch) => ({
  loadFaq: () => {
    dispatch(faqRequest());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Faq);
