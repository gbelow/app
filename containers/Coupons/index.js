import React from 'react';
import {connect} from 'react-redux';
import {View, FlatList} from 'react-native';

import {
  Grid,
  GridItem,
  GridStatus,
  NoResults,
  NoConnection,
} from '../../config/components';

import images from '../../const/images';
import theme from '../../const/theme';
import styles from './styles';

class Coupons extends React.Component {
  static navigationOptions = () => ({
    title: 'Seus cupons',
    headerRight: <View />,
  });

  /**
   * @name renderCouponItem
   * @description return item from user prizes list
   * @param {Object} item
   * @return {React.Component} Grid with children
   */
  renderCouponItem = ({item}) => (
    <Grid>
      <GridItem label="Número" value={item.number} />
      <GridItem label="Data" value={item.date} />
      <GridStatus icon="ticket" iconColor={theme.blue} />
    </Grid>
  );

  render() {
    const {coupons} = this.props.action.data;

    return (
      <View style={styles.container}>
        <FlatList
          data={coupons}
          renderItem={this.renderCouponItem.bind(this)}
          keyExtractor={(item) => item.number}
          ListEmptyComponent={() => {
            if (coupons && coupons.length === 0) {
              return (
                <NoResults
                  image={images.coupon}
                  text="Você não possui cupons"
                />
              );
            } else if (!this.props.connection) {
              return <NoConnection />;
            }

            return null;
          }}
        />
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

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Coupons);
