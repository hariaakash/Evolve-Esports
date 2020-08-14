export default {
    path: '/tournament',
    meta: { requiresAuth: true },
    redirect: { name: 'tournament/list' },
    component: () => import(/* webpackChunkName: "tournament" */ '@/views/Tournament.vue'),
    children: [
        {
            path: 'list',
            name: 'tournament/list',
            component: () => import(/* webpackChunkName: "tournament-list" */ '@/components/tournament/List.vue'),
            meta: {
                title: 'Tournaments',
                requiresAuth: true,
            },
        },
        {
            path: ':id',
            name: 'tournament/id',
            component: () => import(/* webpackChunkName: "tournament-id" */ '@/components/tournament/Tournament.vue'),
            meta: {
                title: 'Tournament',
                requiresAuth: true,
            },
        },
    ],
};