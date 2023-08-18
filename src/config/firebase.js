// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8za735UnSjbeDTAoBfaa_-VADweLP1X8",
  authDomain: "transferme-827ee.firebaseapp.com",
  projectId: "transferme-827ee",
  storageBucket: "transferme-827ee.appspot.com",
  messagingSenderId: "1059350729427",
  appId: "1:1059350729427:web:ee3724995bc464058aba26",
  measurementId: "G-D9J1KG04WL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
