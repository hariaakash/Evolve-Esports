import Vue from 'vue';
import Vuex from 'vuex';
import { vuexfireMutations, firestoreAction } from 'vuexfire';
import { db } from '../db';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
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
    },
    actions: {
        bindMatches: firestoreAction(({ bindFirestoreRef }) => {
            return bindFirestoreRef('matches', db.collection('matches'));
        }),
        toggleModal(ctx) {
            ctx.commit('toggleModal');
        },
    },
});