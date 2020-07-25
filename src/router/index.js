import Vue from 'vue';
import VueRouter from 'vue-router';
import { auth } from '@/db';
import { store as $store } from '@/store';

import Main from '../views/Main.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		redirect: '/home',
		component: Main,
		children: [
			{
				path: '/home',
				component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
				meta: {
					title: 'Home',
				},
			},
			{
				path: '/support',
				component: () => import(/* webpackChunkName: "contact" */ '@/components/global/Support.vue'),
				meta: {
					title: 'Support',
				}
			},
			{
				path: '/account',
				component: () => import(/* webpackChunkName: "account" */ '@/components/Account.vue'),
				meta: {
					title: 'Account',
					requiresAuth: true,
				}
			},
			{
				path: '/404',
				component: () => import(/* webpackChunkName: "404" */ '@/components/global/404.vue'),
				meta: {
					title: '404',
				}
			},
		],
	},
	{
		path: '*',
		redirect: '/404'
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

const suffix = 'Evolve Esports';
router.beforeEach((to, from, next) => {
	// Set title
	if (to.meta && to.meta.title) document.title = `${to.meta.title} | ${suffix}`;

	// auth check
	const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
	if (requiresAuth && !auth.currentUser) {
		next('/');
		$store.dispatch("toggleModal");
	} else {
		if (auth.currentUser && !$store.state.user.auth) $store.dispatch("userAuth", { user: auth.currentUser });
		next();
	}
});

export default router;