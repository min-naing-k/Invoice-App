import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDcWaqeYxKVPt1dRExV2M0Np1zkg2E_c10',
  authDomain: 'invoice-app-175d6.firebaseapp.com',
  projectId: 'invoice-app-175d6',
  storageBucket: 'invoice-app-175d6.appspot.com',
  messagingSenderId: '470483557146',
  appId: '1:470483557146:web:a321432da3e97f0c8deaa3',
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init firestore
const db = firebase.firestore();

// for created_at
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

// for authentication
const auth = firebase.auth();

// for signIn with google
const provider = new firebase.auth.GoogleAuthProvider();

export { db, timestamp, auth, provider };
