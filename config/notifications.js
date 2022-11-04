// import OneSignal from 'react-native-onesignal';
// import PushNotification from 'react-native-push-notification';
// import {
//   store,
// } from './../index';
//
// import {
//   chatRequest,
//   chatPushLockRequest,
//   chatNotReadIncrementRequest,
// } from '../actions/chatActions';
//
// import navigate from '../actions/navigateActions';
// import { meRequest } from '../actions/meActions';
//
// OneSignal.inFocusDisplaying(0);
//
// class Notifications {
//
//   constructor() {
//     PushNotification.configure({
//       onNotification: (notification) => {
//         let params;
//
//         if (notification.custom) {
//           params = JSON.parse(notification.custom);
//         }
//
//         if (params && params.a) {
//           if(params.a.origin === 'chat') {
//             const { chatLockPush } = store.getState();
//
//             store.dispatch(chatRequest());
//             store.dispatch(chatNotReadIncrementRequest());
//
//             if (!chatLockPush.locked) {
//               PushNotification.localNotification({
//                 title: notification.title,
//                 message: notification.alert,
//               });
//
//               store.dispatch(chatPushLockRequest());
//             }
//           } else if (params.a.menu) {
//             const { menus } = store.getState();
//
//             if (menus.data) {
//               let userHasMenu = false;
//
//               menus.data.both.map((menu) => {
//                 if (params.a.menu.id === menu.id) {
//                   userHasMenu = true;
//                 }
//               })
//
//               if (userHasMenu) {
//                 PushNotification.localNotification({
//                   title: notification.title,
//                   message: notification.alert,
//                 });
//               }
//             }
//           }
//         } else {
//           const { session } = store.getState();
//
//           if (session && session.data) {
//             PushNotification.localNotification({
//               title: notification.title,
//               message: notification.alert,
//             });
//           }
//         }
//       },
//     });
//   }
// }
//
// const createNotificationWatcher = () => {
//   const notifications = new Notifications();
// };
//
// export {
//   createNotificationWatcher,
// };
