import "./styles.css";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.intializeApp({
  apiKey: "AIzaSyA6jQFKyoxouAhDiMKftcV8rPBYRbQ5vU0",
  authDomain: "chat-roo-4b80a.firebaseapp.com",
  projectId: "chat-roo-4b80a",
  storageBucket: "chat-roo-4b80a.appspot.com",
  messagingSenderId: "473768943165",
  appId: "1:473768943165:web:5e437d8bcc8d4fd2ef1454",
  measurementId: "G-1XG750QWRZ"
});

const auth = firebase.auth();

const firestore = firebase.firestore();
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
