// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYbDHYO7dBbRsWLEIQo5kSnuJ4SDM_mHs",
  authDomain: "gastos-personales-d3100.firebaseapp.com",
  projectId: "gastos-personales-d3100",
  storageBucket: "gastos-personales-d3100.appspot.com",
  messagingSenderId: "250426360657",
  appId: "1:250426360657:web:95982c96a328b578ea8970"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)

export {
    app, 
    auth,
    db,
    storage,
}