import httpClient from './httpClient';

const oauthUser = ({ social, code }) => httpClient.post('/user/oauth', { social, code });

const getUser = () => httpClient.get('/user/main');

export {
    oauthUser,
    getUser,
};