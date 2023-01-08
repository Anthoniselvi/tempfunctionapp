import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBAK0EeindIp7n0Zs7k1gZSfwcp7nrYzsM",
  authDomain: "functionapp-c76ba.firebaseapp.com",
  projectId: "functionapp-c76ba",
  storageBucket: "functionapp-c76ba.appspot.com",
  messagingSenderId: "813622487992",
  appId: "1:813622487992:web:f4c8ec720cfa7a7c603d4d",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
export const google = new GoogleAuthProvider();
export const facebook = new FacebookAuthProvider();
