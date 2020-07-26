import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import { vuexfireMutations, firestoreAction } from 'vuexfire';
import { DB } from '@/firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        user: {
            info: null,
            auth: false,
        },
        matches: [],
        ui: {
            authModal: false,
        },
    },
    mutations: {
        ...vuexfireMutations,
        toggleModal(state) {
            state.ui.authModal = !state.ui.authModal;
        },
        authUser(state, { displayName: name, email, photoURL, uid } = {}) {
            state.user.info = { name, email, photoURL, uid };
            state.user.auth = true;
        },
        logoutUser(state) {
            state.user = {
                info: null,
                auth: false,
            };
        }
    },
    actions: {
        bindMatches: firestoreAction(({ bindFirestoreRef }) => {
            return bindFirestoreRef('matches', DB.collection('matches'));
        }),
        toggleModal(ctx) {
            ctx.commit('toggleModal');
        },
        async userAuth(ctx, { social, user }) {
            if (!user) {
                const provider = social === 'Google' ? new firebase.auth.GoogleAuthProvider() : new firebase.auth.FacebookAuthProvider();
                const res = await firebase.auth().signInWithPopup(provider);
                user = res.user;
            }
            ctx.commit("authUser", user);
            if (social) ctx.commit("toggleModal");
        },
        async userLogout(ctx) {
            await firebase.auth().signOut();
            ctx.commit('logoutUser');
        }
    },
});