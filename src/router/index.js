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
	if (to.meta && to.meta.title) {
		document.title = `${to.meta.title} | ${suffix}`;
	}
	next();
});

export default router;