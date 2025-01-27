import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAO3itBFroSJADXFm6dRcZke0mwLCZ6CgQ",
  authDomain: "uniplan-f60e3.firebaseapp.com",
  projectId: "uniplan-f60e3",
  storageBucket: "uniplan-f60e3.firebasestorage.app",
  messagingSenderId: "334258963282",
  appId: "1:334258963282:web:c158b39fa24bfa1cb7308b",
  measurementId: "G-0NX2TCGXZ9"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };