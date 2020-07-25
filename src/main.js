import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import './plugins/fa';
import { store } from './store';

Vue.config.productionTip = false;

let app;
firebase.auth().onAuthStateChanged(() => {
	if (!app) {
		app = new Vue({
			store,
			router,
			render: h => h(App)
		}).$mount('#app');
	}
});