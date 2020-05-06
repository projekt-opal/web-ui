import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://opalpro.cs.upb.de:8081/'
});

export default instance;