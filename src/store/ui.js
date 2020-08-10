import Vue from 'vue';
import GlobalService from '@/api/global.api';

export default {
    namespaced: true,
    state: {
        init: false,
        authModal: false,
        modals: [],
        tables: [],
    },
    mutations: {
        SET_INIT(state) {
            state.init = true;
        },
        // Modals
        TOGGLE_AUTHMODAL(state) {
            state.authModal = !state.authModal;
        },
        SET_MODAL(state, id) {
            state.modals.push({ id, status: false });
        },
        TOGGLE_MODAL(state, id) {
            const modal = state.modals.find((x) => x.id === id);
            modal.status = !modal.status;
        },
        // Tables
        SET_TABLE(state, data) {
            state.tables.push(data);
        }
    },
    actions: {
        // Tables
        async initTable(ctx, data) {
            ctx.commit('SET_TABLE', data);
            await ctx.dispatch('fetchPage', { id: data.id })
        },
        async fetchPage(ctx, { id, page }) {
            try {
                const table = ctx.getters.tableById(id);
                if (table) {
                    if (!page) page = table.page;
                    const ApiService = GlobalService[table.entity];
                    const { data } = await ApiService[table.method]({
                        id: "list",
                        filters: table.filters,
                        options: {
                            select: [],
                            pagination: true,
                            page,
                            limit: table.limit,
                            search: "",
                        },
                    });
                    table.docs = data.docs;
                    table.totalDocs = data.meta.totalDocs;
                    table.totalPages = data.meta.totalPages;
                    table.page = data.meta.page;
                }
            } catch (err) {
                Vue.prototype.$swal("Oops", "Fetching data failed", "error");
            }
        },
        async nextPage(ctx, { id }) {
            const table = ctx.getters.tableById(id);
            if (table) {
                if (table.page !== this.totalPages) await ctx.dispatch('fetchPage', { id, page: table.page + 1 });
            }
        },
        async prevPage(ctx, { id }) {
            const table = ctx.getters.tableById(id);
            if (table) {
                if (table.page !== 1) await ctx.dispatch('fetchPage', { id, page: table.page - 1 });
            }
        },
        async selectedPage(ctx, { id, selectedPage }) {
            const table = ctx.getters.tableById(id);
            if (table) {
                if (table.page !== selectedPage) await ctx.dispatch('fetchPage', { id, page: selectedPage });
            }
        },
        async refetchPage(ctx, { id }) {
            await ctx.dispatch('fetchPage', { id });
        }
    },
    getters: {
        modalById: (state) => (id) => {
            return state.modals.find((x) => x.id === id);
        },
        tableById: (state) => (id) => {
            return state.tables.find((x) => x.id === id);
        },
    },
}