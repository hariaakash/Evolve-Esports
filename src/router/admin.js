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
            path: 'tournaments',
            name: 'admin/tournaments',
            component: () => import(/* webpackChunkName: "admin-tournaments" */ '@/components/admin/Tournaments.vue'),
            meta: {
                title: 'Tournaments',
                requiresAuth: true,
            },
        },
    ],
};