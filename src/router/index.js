import Vue from 'vue';
import VueRouter from 'vue-router';
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
				name: 'Home',
				component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
			},
			{
				path: '/404',
				name: '404',
				component: () => import(/* webpackChunkName: "404" */ '@/components/global/404.vue')
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

export default router;