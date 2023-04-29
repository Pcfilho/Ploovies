import { initializeApp } from "firebase/app";
import { 
  getAuth,
  initializeAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAq5Q0MqMV84GW7KgMI3WKzZDVoapVCEdc",
  authDomain: "ploovies.firebaseapp.com",
  projectId: "ploovies",
  storageBucket: "ploovies.appspot.com",
  messagingSenderId: "449212213059",
  appId: "1:449212213059:web:330b99a810328299b4f1f6",
  measurementId: "G-RSHTJM4F30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const initFirebase = () => {
  initializeAuth(app);
};

export const auth = getAuth(app);