import firebase from 'firebase/app';
import "firebase/auth";
import { firestoreAction } from 'vuexfire'
import { DB } from '@/firebase';

export default {
    namespaced: true,
    state: {
        info: {
            uid: null,
            displayName: null,
            email: null,
            photoURL: null,
        },
        db: null,
        auth: false,
    },
    mutations: {
        SET_USER(state, { displayName, email, photoURL, uid }) {
            state.info = { displayName, email, photoURL, uid };
            state.auth = true;
        },
        DEL_USER(state) {
            state.info = {
                uid: null,
                name: null,
                email: null,
                photoURL: null,
            };
            state.db = null;
            state.auth = false;
        },
    },
    actions: {
        async logout(ctx) {
            await firebase.auth().signOut();
            ctx.commit('DEL_USER');
        },
        async initProfile(ctx, data) {
            ctx.commit('SET_USER', data);
            await ctx.dispatch('bindUserRef');
        },
        // async profileSetCheck(ctx) {
        //     const doc = await DB.collection('users').doc(ctx.state.info.uid).get();
        //     if (doc.exists) {
        //         const data = doc.data();
        //         ctx.commit('SET_PROFILE', data);
        //         ctx.dispatch('bindUserRef');
        //     }
        //     return doc.exists;
        // },
        async setProfile(ctx, { name, phone, gamerTag, desc }) {
            await DB.collection('users')
                .doc(ctx.state.info.uid)
                .set({ details: { name, phone, gamerTag, desc } }, { merge: true, });
        },
        bindUserRef: firestoreAction((ctx) => {
            return ctx.bindFirestoreRef('db', DB.collection('users').doc(ctx.state.info.uid));
        }),
    },
    getters: {
        getProfile: (state) => state.db
    }
}