// Import the functions you need from the SDKs you need

const fs = require('firebase-admin');
const serviceAccount = require('./firebase_auth.json');
const Timestamp = fs.firestore.Timestamp;

fs.initializeApp({
  credential: fs.credential.cert(serviceAccount),
  databaseURL: "https://test-assignment-894db-default-rtdb.asia-southeast1.firebasedatabase.app",
  authDomain: "test-assignment-894db.firebaseapp.com",
});


// Your web app's Firebase configuration

const db = fs.firestore();
const auth = fs.auth()
const appointmentDb = db.collection("appointments");
//firebase firestore





module.exports = {
  Timestamp,
  auth,
  appointmentDb,
};