import firebase from "firebase";

const firebaseApp = firebase.initializeApp ({
  apiKey: "AIzaSyAgIMI9jn4kjQ5TlWajbWthwDmJPmvxB6o",
  authDomain: "instagram-clone-12128.firebaseapp.com",
  databaseURL: "https://instagram-clone-12128.firebaseio.com",
  projectId: "instagram-clone-12128",
  storageBucket: "instagram-clone-12128.appspot.com",
  messagingSenderId: "916765610215",
  appId: "1:916765610215:web:c8fcea6b9c19f1aeded242",
  measurementId: "G-Z2BLPB4TWC"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export default {db, auth, storage};