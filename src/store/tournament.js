// import TournamentService from '@/api/tournament.api';

export default {
    namespaced: true,
    state: {
        totalDocs: 0,
        docs: [],
        limit: 1,
        totalPages: 0,
    },
    mutations: {
        SET_TOURNAMENTS(state, data) {
            const fields = ['totalDocs', 'docs', 'limit', 'totalPages'];
            fields.forEach((x) => {
                state[x] = data[x];
            });
        }
    },
    actions: {},
}