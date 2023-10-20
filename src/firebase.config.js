// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1lIigfq99WFR-QFc7GGx8ssHURAPkukI",
  authDomain: "medidek-web.firebaseapp.com",
  projectId: "medidek-web",
  storageBucket: "medidek-web.appspot.com",
  messagingSenderId: "821942632628",
  appId: "1:821942632628:web:c6ab6789d3b15c863297e1"
};







// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);