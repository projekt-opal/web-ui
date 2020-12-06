import axios from 'axios';
import {WEBSERVICE_URL} from './webservice-url';

const instance = axios.create({
    baseURL: WEBSERVICE_URL
});

export default instance;
