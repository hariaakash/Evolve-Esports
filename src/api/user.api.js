import httpClient from './httpClient';

const oauthUser = ({ social, code }) => httpClient.post('/user/oauth', { social, code });

const getUser = () => httpClient.get('/user');

const editUser = (data) => httpClient.put('/user', data);

export {
    oauthUser,
    getUser,
    editUser,
};