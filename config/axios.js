import axios from 'axios';
import {BASE_URL} from '../const/constants';

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default axios;
