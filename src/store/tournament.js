import "firebase/auth";
import { DB } from '@/firebase';

export default {
    namespaced: true,
    state: {},
    mutations: {
        SET_TOURNAMENTS(state, { tournaments }) {
            state.tournaments = tournaments;
        },
    },
    actions: {
        async setTournament(ctx, { uid, data }) {
            if (uid.length === 0) uid = DB.collection('tournaments').doc().id;

            await DB.collection('tournaments')
                .doc(uid)
                .set(data, { merge: true });
        },
    },
}