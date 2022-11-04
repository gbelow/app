import {
  CHAT_REQUEST,
  CHAT_SEND_REQUEST,
  CHAT_SAVE_REQUEST,
  CHAT_PUSH_REQUEST,
  CHAT_PUSH_LOCK_REQUEST,
  CHAT_PUSH_UNLOCK_REQUEST,
  CHAT_NOT_READ_INCREMENT_REQUEST,
  CHAT_NOT_READ_ARCHIVE_REQUEST,
} from '../config/constants';

export const chatRequest = () => ({
  type: CHAT_REQUEST,
});

export const chatSendRequest = (payload) => ({
  type: CHAT_SEND_REQUEST,
  payload,
});

export const chatSaveRequest = (payload) => ({
  type: CHAT_SAVE_REQUEST,
  payload,
});

export const chatPushLockRequest = () => ({
  type: CHAT_PUSH_LOCK_REQUEST,
});

export const chatPushUnlockRequest = () => ({
  type: CHAT_PUSH_UNLOCK_REQUEST,
});

export const chatNotReadIncrementRequest = () => ({
  type: CHAT_NOT_READ_INCREMENT_REQUEST,
});

export const chatNotReadArchiveRequest = () => ({
  type: CHAT_NOT_READ_ARCHIVE_REQUEST,
});
