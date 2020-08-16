export default [
    {
        path: 'tournaments',
        component: () => import(/* webpackChunkName: "tournaments" */ '@/views/Tournaments.vue'),
        children: [
            {
                path: '',
                name: 'tournaments',
                component: () => import(/* webpackChunkName: "tournaments-list" */ '@/components/tournament/List.vue'),
                meta: {
                    title: 'Tournaments',
                },
            },
            {
                path: ':id',
                component: () => import(/* webpackChunkName: "tournament" */ '@/views/Tournament.vue'),
                children: [
                    {
                        path: 'info',
                        name: 'tournaments/info',
                        component: () => import(/* webpackChunkName: "tournament-info" */ '@/components/tournament/Info.vue'),
                    },
                    {
                        path: 'rules',
                        name: 'tournaments/rules',
                        component: () => import(/* webpackChunkName: "tournament-rules" */ '@/components/tournament/Rules.vue'),
                        meta: {
                            title: 'Tournament Info',
                        },
                    },
                ],
            },
        ],
    },
];