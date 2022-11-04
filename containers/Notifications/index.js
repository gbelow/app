import React from 'react';
import {connect} from 'react-redux';

import {View, FlatList, Platform} from 'react-native';

import {NoResults, NotificationItem} from '../../config/components';

import {
  notificationsRequest,
  notificationsArchiveRequest,
} from '../../actions/notificationActions';

import {customNavigate} from '../../actions/navigateActions';

import styles from './styles';

class Notifications extends React.Component {
  static navigationOptions = () => ({
    title: 'Notificações',
    headerRight: <View />,
  });

  state = {
    limit: 10,
  };

  componentDidMount() {
    this.props.loadNotifications(this.state.limit);
  }

  componentWillUnmount() {
    const {session, notifications} = this.props;

    if (this.props.connection) {
      if (session.data.notification.unreadCount && notifications.data) {
        // Send last notification item as parameter
        this.props.archive(notifications.data[0]);
      }
    }
  }

  /**
   * @name renderNotificationItem
   * @description render Notifications item
   * @param {Oject} item to render
   * @return {React.Element}
   * */
  renderNotificationItem = ({item}) => {
    let navigateTo;

    if (item.data && item.data.menu) {
      navigateTo = item.data.menu;
    } else if (item.url) {
      navigateTo = item;
    }

    return (
      <NotificationItem
        title={item.title}
        description={item.message}
        when={item.created}
        read={item.isRead}
        navigate={
          navigateTo ? () => this.props.customNavigate(navigateTo) : null
        }
      />
    );
  };

  onEndReached = () => {
    if (this.props.notifications.meta) {
      const {limit} = this.state;
      const {totalCount} = this.props.notifications.meta;

      if (totalCount > limit) {
        this.props.loadNotifications(limit + 10);

        this.setState({
          limit: limit + 10,
        });
      }
    }
  };

  /**
   * @name extractKey
   * @description extract key to set on key
   * @param {Oject} item to render
   * */
  extractKey = (item) => item.notificationId;

  render() {
    const {notifications} = this.props;

    return (
      <View style={styles.container}>
        {notifications.data && notifications.data.length >= 0 && (
          <FlatList
            data={notifications.data}
            keyExtractor={this.extractKey.bind(this)}
            renderItem={this.renderNotificationItem.bind(this)}
            onEndReached={this.onEndReached.bind(this)}
            onEndReachedThreshold={Platform.OS === 'IOS' ? 1 : 0.5}
            ListEmptyComponent={() => {
              if (notifications.data && notifications.data.length === 0) {
                return (
                  <NoResults
                    text="Nenhuma notificação até o momento"
                    icon="envelope"
                  />
                );
              }

              return null;
            }}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = ({session, notifications, connection}) => ({
  session,
  notifications,
  connection,
});

const mapDispatchToProps = (dispatch) => ({
  loadNotifications: (limit) => {
    dispatch(notificationsRequest(limit));
  },
  archive: (payload) => {
    dispatch(notificationsArchiveRequest(payload));
  },
  customNavigate: (payload) => {
    dispatch(customNavigate(payload));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
