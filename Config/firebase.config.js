/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAl7vU8B7X_z2bW8-NrMMt5ja6dlQF89VE",
  authDomain: "x-pense-tracker.firebaseapp.com",
  projectId: "x-pense-tracker",
  storageBucket: "x-pense-tracker.firebasestorage.app",
  messagingSenderId: "821346522878",
  appId: "1:821346522878:web:1abc4ebbcdc4799c7f37af",
  measurementId: "G-ZEKT21EFR5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
