import Vue from 'vue';
import GlobalService from '@/api/global.api';

export default {
    namespaced: true,
    state: {
        tournament: null,
        match: null,
        user: null,
    },
    mutations: {
        SET_TOURNAMENT(state, data) {
            state.tournament = data;
        },
        SET_MATCH(state, data) {
            state.match = data;
        },
        SET_USER(state, data) {
            state.user = data;
        }
    },
    actions: {
        async fetchTournament(ctx, { id }) {
            const { data } = await GlobalService.tournament.main({ id });
            ctx.commit('SET_TOURNAMENT', data);
        }
    },
    getters: {
        getTournament: (state) => state.tournament,
        getMatch: (state) => state.match,
        getUser: (state) => state.user,
    },
}