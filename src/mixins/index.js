import get from "lodash/get";

const helpersMixin = {
    methods: {
        toggleModal(id) {
            this.$store.commit("ui/TOGGLE_MODAL", id);
        },
        parseField(item, field) {
            return get(item, field);
        },
    },
};

export {
    helpersMixin,
};