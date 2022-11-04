import {RANKING_REQUEST} from '../config/constants';

const rankingRequest = (payload) => ({
  type: RANKING_REQUEST,
  payload,
});

export default rankingRequest;
