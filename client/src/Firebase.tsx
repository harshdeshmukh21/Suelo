import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3QR6XaPOb1dZteVUIppsCct04VVa4iDY",
  authDomain: "suelo-68fc2.firebaseapp.com",
  projectId: "suelo-68fc2",
  storageBucket: "suelo-68fc2.appspot.com",
  messagingSenderId: "28679538974",
  appId: "1:28679538974:web:3625a4353f296b5a13e10f",
  measurementId: "G-XB28PZWTMR",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
