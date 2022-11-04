import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View, Modal} from 'react-native';

import {WebView} from 'react-native-webview';
import {actionTermsRequest} from '../../actions/actionActions';
import {TextLink} from '../../config/components';
import styles from './styles';

class TermsModal extends React.Component {
  static propTypes = {
    actionTerms: PropTypes.object,
    loadActionTerms: PropTypes.func.isRequired,
    visible: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.loadActionTerms(this.props.action);
  }

  render() {
    const {actionTerms} = this.props;

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={this.props.onClose}>
        <View style={styles.container}>
          <View style={styles.inner}>
            {actionTerms.data && (
              <WebView source={{html: actionTerms.data.useTerm}} />
            )}
            <View style={styles.buttonContainer}>
              <TextLink onPress={this.props.onClose} text="Fechar" />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = ({actionTerms}) => ({
  actionTerms,
});

const mapDispatchToProps = (dispatch) => ({
  loadActionTerms: (action) => {
    dispatch(actionTermsRequest(action));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TermsModal);
