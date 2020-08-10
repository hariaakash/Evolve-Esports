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
            component: () => import(/* webpackChunkName: "admin-tournaments" */ '@/components/admin/Tournaments.vue'),
            meta: {
                title: 'Tournaments',
                requiresAuth: true,
            },
        },
        {
            path: 'tournament/:id',
            name: 'admin/tournament',
            component: () => import(/* webpackChunkName: "admin-tournament" */ '@/components/admin/Tournament.vue'),
            meta: {
                title: 'Tournament',
                requiresAuth: true,
            },
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