export default {
    namespaced: true,
    state: {},
    mutations: {
        SET_TOURNAMENTS(state, { tournaments }) {
            state.tournaments = tournaments;
        },
    },
    actions: {},
}