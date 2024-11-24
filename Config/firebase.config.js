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
  apiKey: "AIzaSyBOq84Zm9rQfnAKA4KYN9gjtTlx2IRukak",
  authDomain: "expense-tracker-44e60.firebaseapp.com",
  projectId: "expense-tracker-44e60",
  storageBucket: "expense-tracker-44e60.firebasestorage.app",
  messagingSenderId: "841854283433",
  appId: "1:841854283433:web:ffd2a98596c57e728cc3b8",
  measurementId: "G-RKQQX598YG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
