// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCz8WKkQwfA4qbkRkQXaSCOXjRjflJMYvk",
  authDomain: "test-assignment-894db.firebaseapp.com",
  projectId: "test-assignment-894db",
  storageBucket: "test-assignment-894db.appspot.com",
  messagingSenderId: "1089510591444",
  appId: "1:1089510591444:web:11818684a56a08dbdea441"
};

// Initialize Firebase

const auth = initializeApp(firebaseConfig);
// 

//? server side 

var admin = require("firebase-admin");

var serviceAccount = require("./firebase_auth.json.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
