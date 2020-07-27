import Vue from 'vue';
import VueRouter from 'vue-router';
import { store as $store } from '@/store';

import accountRoute from './account';

import getUserStatus from './getUserStatus';

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
			accountRoute,
			{
				path: '/tournaments',
				name: 'tournaments',
				component: () => import(/* webpackChunkName: "tournaments" */ '@/views/Tournaments.vue'),
				meta: {
					title: 'Tournaments',
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

let initUserCheck = true;

const suffix = 'Evolve Esports';
router.beforeEach(async (to, from, next) => {
	// Set title
	if (to.meta && to.meta.title) document.title = `${to.meta.title} | ${suffix}`;

	// get auth check for first time
	if (initUserCheck) { initUserCheck = false; await getUserStatus(); }

	// route guard
	const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
	if (requiresAuth && !$store.state.user.auth) next('/');
	else next();
});

export default router;