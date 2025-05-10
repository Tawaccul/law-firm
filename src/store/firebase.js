import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDeJIPQJMTw8b4iZeNhpZWKd1NFQTwCrRI",
    authDomain: "lawyers-92e22.firebaseapp.com",
    projectId: "lawyers-92e22",
    storageBucket: "lawyers-92e22.appspot.com",
    messagingSenderId: "212428574881",
    appId: "1:212428574881:web:c47a787a1c8a0284cc60e0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
