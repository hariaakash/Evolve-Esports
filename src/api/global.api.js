import user from './user.api';
import tournament from './tournament.api';
import admin from './admin.api';
import match from './match.api';
import publicRoute from './public.api';

const globalService = {
    user,
    tournament,
    admin,
    match,
    public: publicRoute,
};

export default globalService;