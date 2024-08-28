import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB1Aj1PrIUQdlULIfVmYkJOW4kYb5BrWhU",
  authDomain: "react-todo-19b54.firebaseapp.com",
  projectId: "react-todo-19b54",
  storageBucket: "react-todo-19b54.appspot.com",
  messagingSenderId: "553834544263",
  appId: "1:553834544263:web:21db20a5cd48eebd648c22",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
