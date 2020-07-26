import firebase from 'firebase/app';
import "firebase/auth";

export default {
    namespaced: true,
    state: {
        info: {
            uid: null,
            name: null,
            email: null,
            photoURL: null,
        },
        auth: false,
    },
    mutations: {
        SET_USER(state, { displayName: name, email, photoURL, uid } = {}) {
            state.info = { name, email, photoURL, uid };
            state.auth = true;
        },
        DEL_USER(state) {
            state.info = {
                uid: null,
                name: null,
                email: null,
                photoURL: null,
            };
            state.auth = false;
        }
    },
    actions: {
        async logout(ctx) {
            await firebase.auth().signOut();
            ctx.commit('DEL_USER');
        }
    },
}