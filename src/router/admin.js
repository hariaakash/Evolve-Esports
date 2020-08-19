export default {
    path: '/admin',
    name: 'admin',
    meta: {
        title: 'Admin',
        requiresAuth: true,
    },
    redirect: { name: 'admin/tournaments' },
    component: () => import(/* webpackChunkName: "admin" */ '@/views/Admin.vue'),
    children: [
        {
            path: 'tournaments/list',
            name: 'admin/tournaments',
            component: () => import(/* webpackChunkName: "admin-tournaments" */ '@/views/admin/Tournaments.vue'),
            meta: {
                title: 'Tournaments',
                requiresAuth: true,
            },
        },
        {
            path: 'tournaments/:id',
            component: () => import(/* webpackChunkName: "admin-tournaments-main" */ '@/views/admin/Tournament.vue'),
            meta: {
                requiresAuth: true,
            },
            children: [
                {
                    path: 'matches',
                    name: 'admin/tournaments/matches',
                    component: () => import(/* webpackChunkName: "admin-tournaments-main-matches" */ '@/components/admin/Matches.vue'),
                    meta: {
                        title: 'Tournament Matches',
                    },
                },
                {
                    path: 'teams',
                    name: 'admin/tournaments/teams',
                    component: () => import(/* webpackChunkName: "admin-tournaments-main-teams" */ '@/components/admin/Teams.vue'),
                    meta: {
                        title: 'Tournament Teams',
                    },
                },
            ],
        },
        {
            path: 'users',
            name: 'admin/users',
            component: () => import(/* webpackChunkName: "admin-users" */ '@/components/admin/Users.vue'),
            meta: {
                title: 'Users',
                requiresAuth: true,
            },
        },
    ],
};