// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAw1qrwfgEkdAAP92hY9COX8eqxL6A345w",
  authDomain: "vishwnath-21275.firebaseapp.com",
  projectId: "vishwnath-21275",
  storageBucket: "vishwnath-21275.firebasestorage.app",
  messagingSenderId: "90505061784",
  appId: "1:90505061784:web:f935f6ae2d2c5a33e1f7ed",
  measurementId: "G-BL320WQ4CG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
export { database };