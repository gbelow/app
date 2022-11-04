import {CONNECTION_CHANGED} from '../config/constants';

const updateConnection = (payload) => ({
  type: CONNECTION_CHANGED,
  payload,
});

export default updateConnection;
