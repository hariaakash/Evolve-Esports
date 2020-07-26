import Vue from 'vue';
import firebase from "firebase/app";
import "firebase/auth";
import { store as $store } from '@/store';

const getUserStatus = () => new Promise(function (resolve) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $store.dispatch('userAuth', { user });
            Vue.prototype.$swal("Hooray", `Hi ${user.displayName}`, "success");
            resolve();
        } else {
            $store.dispatch('userLogout');
            resolve();
        }
    });
});

export default getUserStatus;