import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// Your web app's Firebase configuration
if (typeof window !== "undefined" && !firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyC1282dob5bL8dp-1PnPj35x1Hk2iLSj90",
    authDomain: "dev-chat-9be95.firebaseapp.com",
    databaseURL: "https://dev-chat-9be95.firebaseio.com",
    projectId: "dev-chat-9be95",
    storageBucket: "dev-chat-9be95.appspot.com",
    messagingSenderId: "170517851966",
    appId: "1:170517851966:web:04ea5362dba8c3a033066f",
  });
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
}
// var firebaseConfig = {
//     apiKey: "AIzaSyC1282dob5bL8dp-1PnPj35x1Hk2iLSj90",
//     authDomain: "dev-chat-9be95.firebaseapp.com",
//     databaseURL: "https://dev-chat-9be95.firebaseio.com",
//     projectId: "dev-chat-9be95",
//     storageBucket: "dev-chat-9be95.appspot.com",
//     messagingSenderId: "170517851966",
//     appId: "1:170517851966:web:04ea5362dba8c3a033066f"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);

export default firebase;
