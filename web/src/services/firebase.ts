import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDcBUqjq9-y8-V5wP_6g8_38uECkUa_lns",
  authDomain: "firbase-auth-26902.firebaseapp.com",
  projectId: "firbase-auth-26902",
  storageBucket: "firbase-auth-26902.appspot.com",
  messagingSenderId: "544365552392",
  appId: "1:544365552392:web:82c48f2e7a4374182e42bd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
