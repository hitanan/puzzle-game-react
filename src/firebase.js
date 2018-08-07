import firebase from 'firebase'
// Initialize Firebase
const config = {
    apiKey: "AIzaSyBmz8H1GVCpSRd1pKKTd0_lVON8rXugoJ4",
    authDomain: "puzzle-learning.firebaseapp.com",
    databaseURL: "https://puzzle-learning.firebaseio.com",
    projectId: "puzzle-learning",
    storageBucket: "puzzle-learning.appspot.com",
    messagingSenderId: "89876760209"
};
firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;