// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvKzm-DAeYxZJ56Ixk-A8jZ36ZyCFO2J8",
  authDomain: "medidek-another-app.firebaseapp.com",
  projectId: "medidek-another-app",
  storageBucket: "medidek-another-app.appspot.com",
  messagingSenderId: "534996524946",
  appId: "1:534996524946:web:0a07162ba9fe2e2333eb4b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);