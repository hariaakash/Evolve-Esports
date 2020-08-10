import Vue from 'vue';
import VueCookies from 'vue-cookies';
import App from './App.vue';
import router from './router';
import './plugins/progress';
import './plugins/fa';
import './plugins/swal';
import './plugins/veeValidate';
import './plugins/filters';
import { store } from './store';

Vue.use(VueCookies);

Vue.config.productionTip = false;

new Vue({
	store,
	router,
	render: h => h(App)
}).$mount('#app');