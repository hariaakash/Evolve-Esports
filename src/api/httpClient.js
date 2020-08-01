import axios from 'axios';
import VueCookies from 'vue-cookies';

const baseURL = process.env.VUE_APP_BASE_URL || 'http://localhost:3000';

const httpClient = axios.create({ baseURL, timeout: 5000 });

const authInterceptor = (config) => {
    config.headers['authkey'] = VueCookies.get('authkey');
    return config;
};

httpClient.interceptors.request.use(authInterceptor);

export default httpClient;