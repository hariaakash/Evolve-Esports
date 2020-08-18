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
                component: () => import(/* webpackChunkName: "tournaments-main" */ '@/views/Tournament.vue'),
                children: [
                    {
                        path: 'info',
                        name: 'tournaments/info',
                        component: () => import(/* webpackChunkName: "tournaments-main-info" */ '@/components/tournament/Info.vue'),
                        meta: {
                            title: 'Tournament Info',
                        },
                    },
                    {
                        path: 'leaderboard',
                        name: 'tournaments/leaderboard',
                        component: () => import(/* webpackChunkName: "tournaments-main-leaderboard" */ '@/components/tournament/Leaderboard.vue'),
                        meta: {
                            title: 'Tournament Leaderboard',
                        },
                    },
                    {
                        path: 'matches',
                        name: 'tournaments/matches',
                        component: () => import(/* webpackChunkName: "tournaments-main-matches" */ '@/components/tournament/Matches.vue'),
                        meta: {
                            title: 'Tournament Matches',
                        },
                    },
                    {
                        path: 'rules',
                        name: 'tournaments/rules',
                        component: () => import(/* webpackChunkName: "tournaments-main-rules" */ '@/components/tournament/Rules.vue'),
                        meta: {
                            title: 'Tournament Rules',
                        },
                    },
                ],
            },
        ],
    },
];