const config = {
    google: {
        url: 'https://accounts.google.com/o/oauth2/v2/auth',
        client_id: '101774514833-1n2r92omu7lms1isgetcmfp51a68euhs.apps.googleusercontent.com',
        response_type: 'code',
        scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
        redirect_uri: 'http://localhost:8080/oauth',
        access_type: 'offline',
        state: 'google',
        params: () => {
            let params = [];
            params.push(`client_id=${config.google.client_id}`);
            params.push(`response_type=${config.google.response_type}`);
            params.push(`scope=${config.google.scope}`);
            params.push(`redirect_uri=${config.google.redirect_uri}`);
            params.push(`access_type=${config.google.access_type}`);
            params.push(`state=${config.google.state}`);
            return params.join('&');
        },
        link: () => `${config.google.url}?${config.google.params()}`,
    },
};

export default config;