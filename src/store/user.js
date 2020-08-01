import VueCookies from 'vue-cookies';

import { getUser, editUser } from '@/api/user.api';

export default {
    namespaced: true,
    state: {
        _id: null,
        email: null,
        info: {
            name: null,
            gamerTag: null,
            desc: null,
            phone: null,
        },
        role: null,
        auth: false,
    },
    mutations: {
        SET_USER(state, { _id: id, email, info, role }) {
            state.id = id;
            state.email = email;
            state.info = info;
            state.role = role;
            state.auth = true;
        },
        DEL_USER(state) {
            state._id = null;
            state.email = null;
            state.info = {
                name: null,
                gamerTag: null,
                desc: null,
                phone: null,
            };
            state.role = null;
            state.auth = false;
        },
    },
    actions: {
        async logout(ctx) {
            VueCookies.remove('authkey');
            ctx.commit('DEL_USER');
        },
        async authUser(ctx) {
            const { data } = await getUser();
            ctx.commit('SET_USER', data);
        },
        async editProfile(ctx, data) {
            await editUser({ info: data });
            await ctx.dispatch('authUser');
        }
    },
    getters: {
        getUser: (state) => state
    }
}