import Vue from 'vue';
import Vuex from 'vuex';

import ui from './ui';
import user from './user';
import admin from './admin';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        ui,
        user,
        admin,
    },
});