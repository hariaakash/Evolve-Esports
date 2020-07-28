import Vue from 'vue';
import firebase from "firebase/app";
import "firebase/auth";
import { store as $store } from '@/store';

const getUserStatus = () => new Promise(function (resolve) {
    firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
            await $store.dispatch("user/initProfile", user);
            Vue.prototype.$swal("Hooray", `Hi ${user.displayName}`, "success");
            resolve();
        } else {
            resolve();
        }
    });
});

export default getUserStatus;