import Vue from 'vue';
import VueRouter from 'vue-router';

import accountRoute from './account';
import adminRoute from './admin';

import guard from './guard';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		redirect: { name: 'home' },
		component: () => import(/* webpackChunkName: "main" */ '@/views/Main.vue'),
		children: [
			{
				path: '/home',
				name: 'home',
				component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
				meta: {
					title: 'Home',
				},
			},
			{
				path: '/support',
				name: 'support',
				component: () => import(/* webpackChunkName: "support" */ '@/views/Support.vue'),
				meta: {
					title: 'Support',
				},
			},
			{
				path: '/tournaments',
				name: 'tournaments',
				component: () => import(/* webpackChunkName: "tournaments" */ '@/views/Tournaments.vue'),
				meta: {
					title: 'Tournaments',
				},
			},
			{
				path: '/oauth',
				name: 'oauth',
				component: () => import(/* webpackChunkName: "oauth" */ '@/components/global/oauth.vue'),
				meta: {
					title: 'OAUTH',
				},
			},
			{
				path: '/404',
				name: '404',
				component: () => import(/* webpackChunkName: "404" */ '@/components/global/404.vue'),
				meta: {
					title: '404',
				},
			},
			accountRoute,
			adminRoute,
		],
	},
	{
		path: '*',
		redirect: { name: '404' },
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
	linkActiveClass: 'active',
	linkExactActiveClass: 'active',
	scrollBehavior(to, from, savedPosition) {
		return savedPosition ? savedPosition : { x: 0, y: 0 };
	},
});

router.beforeEach(guard);

export default router;