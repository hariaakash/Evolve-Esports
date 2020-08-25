import { store as $store } from '@/store';
import getUserStatus from './guards/getUserStatus';

const suffix = 'Evolve Esports';

const guard = async (to, from, next) => {
    // Set title
    if (to.meta && to.meta.title) document.title = `${to.meta.title} | ${suffix}`;

    await getUserStatus();

    // route guard
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
    if (requiresAuth && !$store.state.user.auth) next('/');
    else {
        if (!$store.state.user.info && to.name !== "account/edit") next({ name: "account/edit" });
        else next();
    }
};

export default guard;