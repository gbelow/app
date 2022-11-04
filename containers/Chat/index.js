import React from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';

import {GiftedChat, Send} from 'react-native-gifted-chat';

import {ScreenLoading} from 'react-native-kin-ui';

import {
  chatRequest,
  chatSendRequest,
  chatSaveRequest,
  chatPushLockRequest,
  chatPushUnlockRequest,
  chatNotReadArchiveRequest,
} from '../../actions/chatActions';

class Chat extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Suporte',
    headerRight: <View />,
  });

  state = {
    messages: [],
  };

  componentDidMount() {
    if (this.props.connection) {
      this.props.chatRequest();
      this.props.chatPushLockRequest();
    }
  }

  componentWillUnmount() {
    this.props.chatPushUnlockRequest();
    this.props.chatNotReadArchiveRequest();
  }

  onSend(messages = []) {
    this.props.chatSaveRequest(messages);

    if (this.props.connection) {
      this.props.chatSendRequest(messages);
    }
  }

  render() {
    const {chat, session} = this.props;
    return (
      <GiftedChat
        renderLoading={() => <ScreenLoading />}
        placeholder="Escreva uma mensagem..."
        messages={chat.data}
        onSend={(messages) => this.onSend(messages)}
        renderSend={(props) => (
          <Send {...props} label="Enviar" textStyle={{fontSize: 18}} />
        )}
        user={{
          _id: session.data.user.name,
          name: session.data.user.name,
        }}
      />
    );
  }
}

const mapStateToProps = ({chat, session, connection}) => ({
  chat,
  session,
  connection,
});

const mapDispatchToProps = (dispatch) => ({
  chatRequest: () => {
    dispatch(chatRequest());
  },
  chatSendRequest: (messages) => {
    dispatch(chatSendRequest(messages));
  },
  chatSaveRequest: (messages) => {
    dispatch(chatSaveRequest(messages));
  },
  chatPushLockRequest: () => {
    dispatch(chatPushLockRequest());
  },
  chatPushUnlockRequest: () => {
    dispatch(chatPushUnlockRequest());
  },
  chatNotReadArchiveRequest: () => {
    dispatch(chatNotReadArchiveRequest());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
