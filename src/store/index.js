import Vue from 'vue';
import Vuex from 'vuex';
import { vuexfireMutations } from 'vuexfire';

import ui from './ui';
import user from './user';
import tournament from './tournament';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        ui,
        user,
        tournament,
    },
    mutations: {
        ...vuexfireMutations,
    }
});