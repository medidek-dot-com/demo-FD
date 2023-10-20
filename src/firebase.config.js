// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPEDKaG3JlKQUHwDieeCSKBg6hPjrDxfE",
  authDomain: "medidek-new.firebaseapp.com",
  projectId: "medidek-new",
  storageBucket: "medidek-new.appspot.com",
  messagingSenderId: "767148024609",
  appId: "1:767148024609:web:e0f7c7d0bc9f3841f8d460"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);