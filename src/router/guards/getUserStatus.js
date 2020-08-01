import Vue from 'vue';
import VueCookies from 'vue-cookies';
import { store as $store } from '@/store';

import { getUser } from "@/api/user.api";

const getUserStatus = async () => {
    if (!$store.state.user.auth) {
        if (VueCookies.isKey('authkey')) {
            try {
                const { data } = await getUser();
                await $store.dispatch("user/authUser", data);
                Vue.prototype.$swal("Hooray", `Welcome`, "success");
            } catch (err) {
                VueCookies.remove('authkey');
            }
        }
    }
    $store.commit('ui/SET_INIT');
};

export default getUserStatus;