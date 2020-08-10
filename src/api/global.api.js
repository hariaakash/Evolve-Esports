import user from './user.api';
import tournament from './tournament.api';
import admin from './admin.api';
import match from './match.api';

const globalService = {
    user,
    tournament,
    admin,
    match,
};

export default globalService;