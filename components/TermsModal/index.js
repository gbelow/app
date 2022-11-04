import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View, Modal} from 'react-native';

import {WebView} from 'react-native-webview';
import {termsRequest} from '../../actions/termsActions';
import {TextLink} from '../../config/components';
import styles from './styles';

class TermsModal extends React.Component {
  static propTypes = {
    terms: PropTypes.object,
    loadTerms: PropTypes.func.isRequired,
    visible: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.loadTerms();
  }

  render() {
    const {terms} = this.props;

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={this.props.onClose}>
        <View style={styles.container}>
          <View style={styles.inner}>
            {terms.data && <WebView source={{html: terms.data.useTerm}} />}
            <View style={styles.buttonContainer}>
              <TextLink onPress={this.props.onClose} text="Fechar" />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = ({terms}) => ({
  terms,
});

const mapDispatchToProps = (dispatch) => ({
  loadTerms() {
    dispatch(termsRequest());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TermsModal);
