import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View, Text, FlatList} from 'react-native';

import {appId} from '../../package.json';
import DrawerAvatar from '../DrawerAvatar';
import MenuItem from '../MenuItem';
import styles from './styles';

class DrawerContent extends React.Component {
  static propTypes = {
    session: PropTypes.object.isRequired,
    chatNotReadMessages: PropTypes.number,
  };

  /**
   * @name renderDrawerItem
   * @description render drawer item
   * @returns {React.Element}
   *
   */
  renderDrawerItem({item}) {
    return (
      <MenuItem
        menu={item}
        badge={item.type === 'helpme' && this.props.chatNotReadMessages}
      />
    );
  }

  formatCNPJ(cnpj) {
    if (cnpj) {
      return cnpj
        .toString()
        .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5');
    }
  }

  formatCPF(cpf) {
    if (cpf) {
      return `*******${cpf.toString().slice(-4)}`;
    }
  }

  render() {
    const {session, menus, publicMenus} = this.props;

    if (!session.logged) {
      return (
        <FlatList
          data={publicMenus.data && publicMenus.data.side}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderDrawerItem.bind(this)}
        />
      );
    }

    return (
      <View style={styles.container}>
        {session.data && (
          <View>
            {appId !== 'amc' && (
              <DrawerAvatar
                avatar={`https://graph.facebook.com/${session.data.user.userId}/picture?type=large`}
                name={session.data.user.name}
              />
            )}
            <View style={styles.userInfoContainer}>
              {session.data.user.company && (
                <View style={styles.userInfoItem}>
                  <Text numberOfLines={1} style={styles.infoValue}>
                    <Text style={styles.infoLabel}>Loja:</Text>
                    {` ${session.data.user.company.name}`}
                  </Text>
                </View>
              )}
              {session.data.user.company && (
                <View style={styles.userInfoItem}>
                  <Text numberOfLines={1} style={styles.infoValue}>
                    <Text style={styles.infoLabel}>CNPJ:</Text>
                    {` ${this.formatCNPJ(session.data.user.company.cnpj)}`}
                  </Text>
                </View>
              )}
              <View style={styles.userInfoItem}>
                <Text numberOfLines={1} style={styles.infoLabel}>
                  {session.data.user.name}
                </Text>
              </View>
            </View>
            <FlatList
              data={menus.data && menus.data.side}
              keyExtractor={(item, index) => index.toString()}
              renderItem={this.renderDrawerItem.bind(this)}
            />
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({
  menus,
  publicMenus,
  session,
  chatNotReadMessages,
}) => ({
  menus,
  session,
  chatNotReadMessages,
  publicMenus,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
