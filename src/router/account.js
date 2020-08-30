export default {
    path: '/account',
    meta: { requiresAuth: true },
    redirect: { name: 'account/profile' },
    component: () => import(/* webpackChunkName: "account" */ '@/views/Account.vue'),
    children: [
        {
            path: 'profile',
            name: 'account/profile',
            component: () => import(/* webpackChunkName: "account-profile" */ '@/components/account/Profile.vue'),
            meta: {
                title: 'Profile',
                requiresAuth: true,
            },
        },
        {
            path: 'edit',
            name: 'account/edit',
            component: () => import(/* webpackChunkName: "account-edit" */ '@/components/account/Edit.vue'),
            meta: {
                title: 'Edit',
                requiresAuth: true,
            },
        },
        {
            path: 'tournaments',
            name: 'account/tournaments',
            component: () => import(/* webpackChunkName: "account-tournaments" */ '@/components/account/Tournaments.vue'),
            meta: {
                title: 'Tournaments',
                requiresAuth: true,
            },
        },
    ],
};