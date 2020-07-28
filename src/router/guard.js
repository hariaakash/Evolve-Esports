import { store as $store } from '@/store';

import getUserStatus from './getUserStatus';

let initUserCheck = true;
const suffix = 'Evolve Esports';

const guard = async (to, from, next) => {
    // Set title
    if (to.meta && to.meta.title) document.title = `${to.meta.title} | ${suffix}`;

    // get auth check for first time
    if (initUserCheck) { initUserCheck = false; await getUserStatus(next); }

    // route guard
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
    if (requiresAuth && !$store.state.user.auth) next('/');
    else next();
};

export default guard;