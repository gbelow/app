import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {SignupForm, ConfirmModal} from '../../config/components';
import {meUpdateRequest, meDeleteRequest} from '../../actions/meActions';

import styles from './styles';

class Profile extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.title,
    headerRight: <View />,
  });

  state = {
    showConfirmModal: false,
  };

  /**
   * @name handleSubmit
   * @description save user profile
   * @return {Void}
   */
  handleSubmit(data) {
    const {session} = this.props;

    let {user} = data;
    let {company} = data;

    (user.name = session.data.user.name),
      (user.userId = session.data.user.userId),
      this.props.update({user, company});
  }

  deleteAccount() {
    this.props.delete();
  }

  toggleConfirmModal() {
    this.setState({
      showConfirmModal: !this.state.showConfirmModal,
    });
  }

  render() {
    const {session} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarInfoContainer}>
            <Text numberOfLines={1} style={styles.avatarName}>
              {session.data.user.name}
            </Text>
            {session.data.user.company && (
              <Text numberOfLines={1} style={styles.avatarCompany}>
                {session.data.user.company.name}
              </Text>
            )}
          </View>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={this.toggleConfirmModal.bind(this)}>
            <Icon name="trash" style={styles.deleteIcon} />
            <Text style={styles.deleteText}>Excluir conta</Text>
          </TouchableOpacity>
        </View>
        {session.data && session.data.user && (
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : -150}
            style={styles.formContainer}>
            <SignupForm
              termsAccepted={true}
              email={session.data.user.email}
              cpf={String(session.data.user.cpf)}
              cnpj={String(session.data.user?.company?.cnpj || '')}
              phone={session.data.user.phone}
              birthday={session.data.user.birthday}
              buttonLabel="Salvar"
              onSubmit={this.handleSubmit.bind(this)}
            />
          </KeyboardAvoidingView>
        )}
        <ConfirmModal
          title="Excluir conta"
          description="Você tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita."
          buttonLabel="Confirmar"
          visible={this.state.showConfirmModal}
          onConfirm={this.deleteAccount.bind(this)}
          onClose={this.toggleConfirmModal.bind(this)}
        />
      </View>
    );
  }
}

const mapStateToProps = ({session}) => ({
  session,
});

const mapDispatchToProps = (dispatch) => ({
  update: (payload) => {
    dispatch(meUpdateRequest(payload));
  },
  delete: () => {
    dispatch(meDeleteRequest());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
