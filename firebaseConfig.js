
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAee0Xzeh91zc73FPnWvJO7dirBAqUWc7g",
  authDomain: "iscf---1.firebaseapp.com",
  databaseURL: "https://iscf---1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "iscf---1",
  storageBucket: "iscf---1.appspot.com",
  messagingSenderId: "702109146022",
  appId: "1:702109146022:web:a10ee93c88cc403fab4d67",
  measurementId: "G-1KY1KHYJZB"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);