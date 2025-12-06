// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAI3ceH4CtRAUxa4Wet_5mvLdqTkcAP320",
  authDomain: "clean-and-connect.firebaseapp.com",
  projectId: "clean-and-connect",
  storageBucket: "clean-and-connect.firebasestorage.app",
  messagingSenderId: "1066037739694",
  appId: "1:1066037739694:web:2e1affe21fa513f8bbed3f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);