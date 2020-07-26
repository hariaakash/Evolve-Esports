import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from "firebase/app";
import "firebase/auth";
import { store as $store } from '@/store';

import Main from '@/views/Main.vue';

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
				component: () => import(/* webpackChunkName: "support" */ '@/views/Support.vue'),
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
	scrollBehavior(to, from, savedPosition) {
		return savedPosition ? savedPosition : { x: 0, y: 0 };
	},
});

const getUserStatus = () => new Promise(function (resolve) {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			$store.dispatch('userAuth', { user });
			resolve();
		} else {
			$store.dispatch('userLogout');
			resolve();
		}
	});
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