import {
  NOTIFICATIONS_REQUEST,
  NOTIFICATIONS_ARCHIVE_REQUEST,
} from '../config/constants';

export const notificationsRequest = (payload) => ({
  type: NOTIFICATIONS_REQUEST,
  payload,
});

export const notificationsArchiveRequest = (payload) => ({
  type: NOTIFICATIONS_ARCHIVE_REQUEST,
  payload,
});
