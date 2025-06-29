// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBFwWYQ8SOPtlAb_sL4kF5l9zlxBpA9Fb8",
  authDomain: "sokoni-464a6.firebaseapp.com",
  projectId: "sokoni-464a6",
  storageBucket: "sokoni-464a6.firebasestorage.app",
  messagingSenderId: "548440026088",
  appId: "1:548440026088:web:9223dbb0cd358a141fd25d",
  measurementId: "G-B7JT4255PB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export {auth, RecaptchaVerifier, analytics}