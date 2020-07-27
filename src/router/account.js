export default {
    path: '/account',
    name: 'account',
    meta: {
        title: 'Account',
        requiresAuth: true,
    },
    redirect: { name: 'profile' },
    component: () => import(/* webpackChunkName: "account" */ '@/views/Account.vue'),
    children: [
        {
            path: 'profile',
            name: 'profile',
            component: () => import(/* webpackChunkName: "profile" */ '@/components/account/Profile.vue'),
            meta: {
                title: 'Profile',
                requiresAuth: true,
            },
        },
    ],
};