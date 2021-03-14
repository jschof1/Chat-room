import "./styles.css";
import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyA6jQFKyoxouAhDiMKftcV8rPBYRbQ5vU0",
  authDomain: "chat-roo-4b80a.firebaseapp.com",
  databaseURL:
    "https://chat-roo-4b80a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chat-roo-4b80a",
  storageBucket: "chat-roo-4b80a.appspot.com",
  messagingSenderId: "473768943165",
  appId: "1:473768943165:web:2cfc347a43f939e3ef1454",
  measurementId: "G-NX5X827GXE"
});

const auth = firebase.auth();

const firestore = firebase.firestore();

export default function App() {
  //in == object / out == null
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header>
        <span role="img" aria-label="chat">
          {" "}
          <h1>💬</h1>{" "}
        </span>
        <SignOut />
      </header>

      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  //pop up window
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <>
      <button onClick={signInWithGoogle}>Sign in with Google </button>
    </>
  );
}

function SignOut() {
  //
  return (
    auth.currentUser && (
      <>
        <button onClick={() => auth.signOut()}>Sign in with Google </button>
      </>
    )
  );
}

function ChatRoom() {
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limitToLast(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoUrl } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoUrl
    });

    setFormValue("");
  };

  return (
    <>
      <form onSubmit={sendMessage}>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />

        <span role="img" aria-label="bird">
          <button type="submit" disabled={!formValue}>
            🕊️
          </button>
        </span>
      </form>
    </>
  );
}

function ChatMessage({ message }) {
  const { text, uid, photoUrl } = { message };

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img src={photoUrl} alt="" />
        <p>{text}</p>
      </div>
    </>
  );
}
