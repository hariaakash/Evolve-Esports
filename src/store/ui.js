export default {
    namespaced: true,
    state: {
        init: false,
        authModal: false,
        modals: [],
    },
    mutations: {
        SET_INIT(state) {
            state.init = true;
        },
        TOGGLE_AUTHMODAL(state) {
            state.authModal = !state.authModal;
        },
        SET_MODAL(state, id) {
            state.modals.push({ id, status: false });
        },
        TOGGLE_MODAL(state, id) {
            const modal = state.modals.find((x) => x.id === id);
            modal.status = !modal.status;
        }
    },
    getters: {
        modalById: (state) => (id) => {
            return state.modals.find((x) => x.id === id);
        }
    },
}