import VueCookies from 'vue-cookies';

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
        SET_USER(state, { _id, email, info, role }) {
            state.id = _id;
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
        async authUser(ctx, data) {
            ctx.commit('SET_USER', data);
        },
    },
    getters: {
        getUser: (state) => state
    }
}