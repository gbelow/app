import React from 'react';
import {connect} from 'react-redux';

import {View, Text} from 'react-native';

import {termsRequest, termsAcceptRequest} from '../../actions/termsActions';

import {TextLink} from '../../config/components';

import {WebView} from 'react-native-webview';
import styles from './styles';

class Terms extends React.Component {
  static navigationOptions = () => ({
    title: 'Termos de Uso',
    headerRight: <View />,
  });

  componentDidMount() {
    this.props.loadTerms();
  }

  render() {
    const {terms} = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Nossos termos foram atualizados, aceite novamente para continuar
          utilizando o app.
        </Text>
        {terms.data && <WebView source={{html: terms.data.useTerm}} />}
        <View style={styles.buttonContainer}>
          <TextLink
            onPress={this.props.acceptTerms.bind(this)}
            text="Aceitar"
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({terms}) => ({
  terms,
});

const mapDispatchToProps = (dispatch) => ({
  loadTerms: () => {
    dispatch(termsRequest());
  },
  acceptTerms: () => {
    dispatch(termsAcceptRequest());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Terms);
