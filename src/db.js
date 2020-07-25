import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCUlk0i046ScqhZ5mFzyYO-9YZdHVNjshw",
    authDomain: "evolve-esports.firebaseapp.com",
    databaseURL: "https://evolve-esports.firebaseio.com",
    projectId: "evolve-esports",
    storageBucket: "evolve-esports.appspot.com",
    messagingSenderId: "101774514833",
    appId: "1:101774514833:web:a2943463ba4bf5dea3fd30",
    measurementId: "G-NR7MH2XXEE"
};

export const db = firebase
    .initializeApp(firebaseConfig)
    .firestore();

const { TimeStamp, GeoPoint } = firebase.firestore;
export { TimeStamp, GeoPoint };