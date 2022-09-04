// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
  
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyACY0ZcT9cr3ojI4Ss33cm_dmxM0e3yGLQ",
    authDomain: "mwitter-4ed60.firebaseapp.com",
    projectId: "mwitter-4ed60",
    storageBucket: "mwitter-4ed60.appspot.com",
    messagingSenderId: "697218904213",
    appId: "1:697218904213:web:4d8a0b87eac3e2c4f9ab9c"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();

export const dbService = firebase.firestore();