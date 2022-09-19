// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmkDB3xo9Kex-86cUes13sNmsV7NAIfNY",
  authDomain: "csc-4899.firebaseapp.com",
  databaseURL: "https://csc-4899-default-rtdb.firebaseio.com",
  projectId: "csc-4899",
  storageBucket: "csc-4899.appspot.com",
  messagingSenderId: "1056211651779",
  appId: "1:1056211651779:web:e8402bebd2981e548a2676",
  measurementId: "G-LY1JDEXEQP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);