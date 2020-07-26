export default {
    namespaced: true,
    state: {
        authModal: false,
    },
    mutations: {
        TOGGLE_AUTHMODAL(state) {
            state.authModal = !state.authModal;
        },
    },
}