import {fork} from 'redux-saga/effects';

import watchMeSaga from './meSaga';
import sessionSaga from './sessionSaga';
import watchAlertSaga from './alertSaga';
import watchCustomerSaga from './customerSaga';
import rankingSaga from './rankingSaga';
import saleSaga from './saleSaga';
import watchPrizeSaga from './prizeSaga';
import watchTermsSaga from './termsSaga';
import watchSalesHistorySaga from './salesHistorySaga';
import watchAppStateSaga from './appStateSaga';
import watchRehydratedSaga from './rehydratedSaga';
import watchNotifications from './notificationsSaga';
import watchUserDeviceSaga from './userDeviceSaga';
import watchDevolutionSaga from './devolutionSaga';
import watchDevolutionsHistorySaga from './devolutionsHistorySaga';
import watchChatSaga from './chatSaga';
import watchConnectionSaga from './connectionSaga';
import watchMenusSaga from './menusSaga';
import watchContentSaga from './contentSaga';
import watchActionSaga from './actionSaga';
import watchNavigateSaga from './navigateSaga';
import watchVersionSaga from './versionSaga';
import watchCavabenSaga from './cavabenSaga';
import watchReactionSaga from './reactionSaga';
import watchFaqSaga from './faqSaga';
import watchRssFeedSaga from './rssFeedSaga';
import watchS3Saga from './s3Saga';
import watchStampSaga from './stampSaga';
import watchPilotPhotosSaga from './pilotPhotosSaga';

const startForman = function* () {
  yield [
    fork(watchMeSaga),
    fork(watchPrizeSaga),
    fork(watchAlertSaga),
    fork(watchCustomerSaga),
    fork(rankingSaga),
    fork(saleSaga),
    fork(sessionSaga),
    fork(watchTermsSaga),
    fork(watchSalesHistorySaga),
    fork(watchAppStateSaga),
    fork(watchRehydratedSaga),
    fork(watchNotifications),
    fork(watchUserDeviceSaga),
    fork(watchDevolutionSaga),
    fork(watchDevolutionsHistorySaga),
    fork(watchChatSaga),
    fork(watchConnectionSaga),
    fork(watchMenusSaga),
    fork(watchContentSaga),
    fork(watchActionSaga),
    fork(watchNavigateSaga),
    fork(watchVersionSaga),
    fork(watchCavabenSaga),
    fork(watchReactionSaga),
    fork(watchFaqSaga),
    fork(watchRssFeedSaga),
    fork(watchS3Saga),
    fork(watchStampSaga),
    fork(watchPilotPhotosSaga),
  ];
};

export default startForman;
