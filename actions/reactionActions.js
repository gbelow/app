import {REACTION_SEND_REQUEST} from '../config/constants';

const reactionSendRequest = (payload) => ({
  type: REACTION_SEND_REQUEST,
  payload,
});

export default reactionSendRequest;
