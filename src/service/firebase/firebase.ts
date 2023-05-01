import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAq5Q0MqMV84GW7KgMI3WKzZDVoapVCEdc",
  authDomain: "ploovies.firebaseapp.com",
  projectId: "ploovies",
  storageBucket: "ploovies.appspot.com",
  messagingSenderId: "449212213059",
  appId: "1:449212213059:web:330b99a810328299b4f1f6",
  measurementId: "G-RSHTJM4F30"
};

const app = initializeApp(firebaseConfig);
export const initFirebase = () => {
  initializeAuth(app);
};

export const auth = getAuth(app);

export const firestore = getFirestore(app);