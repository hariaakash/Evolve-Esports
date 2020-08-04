const helpersMixin = {
    methods: {
        toggleModal(id) {
            this.$store.commit("ui/TOGGLE_MODAL", id);
        },
    },
};

export {
    helpersMixin,
};