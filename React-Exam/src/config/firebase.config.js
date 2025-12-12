import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD64PWAGf88pWkRCeTIEF1Pqx9od84s0fQ",
  authDomain: "blog-46673.firebaseapp.com",
  projectId: "blog-46673",
  storageBucket: "blog-46673.firebasestorage.app",
  messagingSenderId: "1042984335376",
  appId: "1:1042984335376:web:abd238f4493e4c04e6f295"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);