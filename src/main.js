import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import router from './router';
import './plugins/progress';
import './firebase';
import './plugins/fa';
import './plugins/swal';
import { store } from './store';

Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
	store,
	router,
	render: h => h(App)
}).$mount('#app');