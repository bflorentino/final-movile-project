// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore, initializeFirestore } from 'firebase/firestore'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { Platform } from "react-native";

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

let db;


if (Platform.OS === "android") {
  connectAuthEmulator(auth, "http://10.0.0.2:9090");
  db =  initializeFirestore(app, {experimentalForceLongPolling: true});
  connectFirestoreEmulator(db, "10.0.2.2", 8080);
} else {
  db = getFirestore(app)
}

// const db = getFirestore(app);
const storage = getStorage(app)

export {
    app, 
    auth,
    db,
    storage,
}