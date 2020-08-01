import Vue from 'vue';
import VueCookies from 'vue-cookies';
import { store as $store } from '@/store';

const getUserStatus = async () => {
    if (!$store.state.user.auth) {
        if (VueCookies.isKey('authkey')) {
            try {
                await $store.dispatch("user/authUser");
                Vue.prototype.$swal("Hooray", `Welcome`, "success");
            } catch (err) {
                VueCookies.remove('authkey');
            }
        }
    }
    $store.commit('ui/SET_INIT');
};

export default getUserStatus;