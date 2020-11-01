import firebase from 'firebase'
import "firebase/auth";
import "firebase/database"

var firebaseConfig = {
    apiKey: "AIzaSyA5tfxAtpZgYljiQ1ZkRhxFGNJCjjuYet8",
    authDomain: "mysecretsantaapp-e60a9.firebaseapp.com",
    databaseURL: "https://mysecretsantaapp-e60a9.firebaseio.com",
    projectId: "mysecretsantaapp-e60a9",
    storageBucket: "mysecretsantaapp-e60a9.appspot.com",
    messagingSenderId: "124286638694",
    appId: "1:124286638694:web:33c4a398c1be1252a92ba7",
    measurementId: "G-LT5TY11LKB"
  }; 
  

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;