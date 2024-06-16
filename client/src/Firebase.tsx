// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3QR6XaPOb1dZteVUIppsCct04VVa4iDY",
  authDomain: "suelo-68fc2.firebaseapp.com",
  projectId: "suelo-68fc2",
  storageBucket: "suelo-68fc2.appspot.com",
  messagingSenderId: "28679538974",
  appId: "1:28679538974:web:3625a4353f296b5a13e10f",
  measurementId: "G-XB28PZWTMR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
