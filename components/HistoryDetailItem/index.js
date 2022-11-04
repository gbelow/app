import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';

import {Grid, GridItem, GridStatus} from '../../config/components';

import theme from '../../const/theme';
import styles from './styles';

class HistoryDetailItem extends React.Component {
  static propTypes = {
    tag: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    date: PropTypes.string,
    items: PropTypes.array,
    status: PropTypes.string,
    error: PropTypes.object,
  };

  get label() {
    const {status} = this.props;

    if (status === 'approved') {
      return 'Aprovada';
    } else if (status === 'accepted') {
      return 'Aceita';
    } else if (status === 'returned') {
      return 'Devolvida';
    }
    return 'Reprovada';
  }

  get icon() {
    const {status} = this.props;

    if (status === 'approved') {
      return 'star';
    } else if (status === 'returned') {
      return 'exchange';
    }
    return 'star-o';
  }

  get iconColor() {
    const {status} = this.props;

    if (status === 'approved') {
      return 'gold';
    } else if (status === 'returned') {
      return theme.blue;
    }
    return theme.red;
  }

  render() {
    return (
      <View style={styles.container}>
        <Grid>
          <GridItem label="Tag" value={this.props.tag} />
          <GridItem
            label={this.props.error && 'Erro'}
            value={this.props.error && this.props.error.message}
          />
          {this.props.status && (
            <GridStatus
              label={this.label}
              icon={this.icon}
              iconColor={this.iconColor}
            />
          )}
        </Grid>
      </View>
    );
  }
}

export default HistoryDetailItem;
