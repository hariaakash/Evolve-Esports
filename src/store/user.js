import VueCookies from 'vue-cookies';

import UserService from '@/api/user.api';

export default {
    namespaced: true,
    state: {
        id: null,
        email: null,
        info: {
            name: null,
            gamerTag: null,
            desc: null,
            phone: null,
        },
        tournaments: [],
        role: null,
        social: {},
        auth: false,
    },
    mutations: {
        SET_USER(state, { _id: id, email, info, role, social, tournaments }) {
            state.id = id;
            state.email = email;
            state.info = info;
            state.role = role;
            state.social = social;
            state.tournaments = tournaments;
            state.auth = true;
        },
        DEL_USER(state) {
            state.id = null;
            state.email = null;
            state.info = {
                name: null,
                gamerTag: null,
                desc: null,
                phone: null,
            };
            state.tournaments = [];
            state.role = null;
            state.social = null;
            state.auth = false;
        },
    },
    actions: {
        async logout(ctx) {
            VueCookies.remove('authkey');
            ctx.commit('DEL_USER');
        },
        async authUser(ctx) {
            const { data } = await UserService.self();
            ctx.commit('SET_USER', data);
        },
        async editProfile(ctx, info) {
            await UserService.edit({ info });
            await ctx.dispatch('authUser');
        }
    },
    getters: {
        getUser: (state) => state
    }
}