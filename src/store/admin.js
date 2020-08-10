import Vue from 'vue';
import GlobalService from '@/api/global.api';

export default {
    namespaced: true,
    state: {
        tournament: null,
    },
    mutations: {
        SET_TOURNAMENT(state, data) {
            state.tournament = data;
        }
    },
    actions: {
        async fetchTournament(ctx, { id }) {
            try {
                const { data } = await GlobalService.tournament.main({ id });
                ctx.commit('SET_TOURNAMENT', data);
            } catch (err) {
                console.log(err);
            }
        }
    },
    getters: {
        getTournament: (state) => state.tournament,
    },
}