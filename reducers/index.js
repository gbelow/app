import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistCombineReducers} from 'redux-persist';

// import { appId } from '../../../../package.json';

// import storage from 'redux-persist/lib/storage';
import sessionReducer from './sessionReducer';
import navigatorReducer from './navigatorReducer';
import activityIndicatorReducer from './activityIndicatorReducer';
import customerReducer from './customerReducer';
import customerSaleReducer from './customerSaleReducer';
import prizeReducer from './prizeReducer';
import rankingReducer from './rankingReducer';
import connectionReducer from './connectionReducer';
import termsReducer from './termsReducer';
import actionReducer from './actionReducer';
import actionHistoryReducer from './actionHistoryReducer';
import notificationsReducer from './notificationsReducer';
import redirectReducer from './redirectReducer';
import userDeviceReducer from './userDeviceReducer';
import refreshReducer from './refreshReducer';
import salesHistoryReducer from './salesHistoryReducer';
import saleReducer from './saleReducer';
import actionTermsReducer from './actionTermsReducer';
import devolutionsHistoryReducer from './devolutionsHistoryReducer';
import chatReducer from './chatReducer';
import chatPendingReducer from './chatPendingReducer';
import chatLockPushReducer from './chatLockPushReducer';
import chatNotReadReducer from './chatNotReadReducer';
import menusReducer from './menusReducer';
import contentReducer from './contentReducer';
import versionReducer from './versionReducer';
import saleFeedbackReducer from './saleFeedbackReducer';
import cavabenReducer from './cavabenReducer';
import productsReducer from './productsReducer';
import faqReducer from './faqReducer';
import settingsReducer from './settingsReducer';
import publicMenusReducer from './publicMenusReducer';
import rssFeedReducer from './rssFeedReducer';
import stampReducer from './stampReducer';
import pilotLastFolderReducer from './pilotLastFolderReducer';
import pilotFoldersReducer from './pilotFoldersReducer';

let config = {
  key: 'amc',
  storage: AsyncStorage,
  whitelist: [
    'session',
    'action',
    'sales',
    'prizes',
    'ranking',
    'customers',
    'chat',
    'chatPendingMessages',
    'device',
    'menus',
    'history',
    'notifications',
    'version',
    'settings',
    'pilotLastFolder',
    'pilotFolders',
  ],
};

const reducers = persistCombineReducers(config, {
  session: sessionReducer,
  nav: navigatorReducer,
  activity: activityIndicatorReducer,
  customers: customerReducer,
  customerSale: customerSaleReducer,
  prizes: prizeReducer,
  ranking: rankingReducer,
  connection: connectionReducer,
  terms: termsReducer,
  action: actionReducer,
  actionsHistory: actionHistoryReducer,
  notifications: notificationsReducer,
  redirect: redirectReducer,
  device: userDeviceReducer,
  refresh: refreshReducer,
  sales: saleReducer,
  history: salesHistoryReducer,
  devolutionsHistory: devolutionsHistoryReducer,
  chat: chatReducer,
  chatLockPush: chatLockPushReducer,
  chatPendingMessages: chatPendingReducer,
  chatNotReadMessages: chatNotReadReducer,
  menus: menusReducer,
  publicMenus: publicMenusReducer,
  content: contentReducer,
  actionTerms: actionTermsReducer,
  version: versionReducer,
  saleFeedback: saleFeedbackReducer,
  cavaben: cavabenReducer,
  products: productsReducer,
  faq: faqReducer,
  settings: settingsReducer,
  rssFeed: rssFeedReducer,
  stamps: stampReducer,
  pilotLastFolder: pilotLastFolderReducer,
  pilotFolders: pilotFoldersReducer,
});

export default reducers;
