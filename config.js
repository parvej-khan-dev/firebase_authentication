// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getDatabase, ref } = require("firebase/database");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCz8WKkQwfA4qbkRkQXaSCOXjRjflJMYvk",
  authDomain: "test-assignment-894db.firebaseapp.com",
  projectId: "test-assignment-894db",
  storageBucket: "test-assignment-894db.appspot.com",
  messagingSenderId: "1089510591444",
  appId: "1:1089510591444:web:11818684a56a08dbdea441",
  databaseURL: 'https://test-assignment-894db-default-rtdb.asia-southeast1.firebasedatabase.app'
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const appointmentsRef = ref(database, 'appointments');


module.exports = { appointmentsRef, database };