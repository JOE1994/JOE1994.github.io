// Code for submitting to Firestore DB
//
// Data is stored to DB only if logged-in with admin account.
// (My Firestore DB has a security rule to only accept writes from my admin account)

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js'

// Add Firebase products that you want to use
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js'

import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js'

import {firebaseConfig} from './firebase_config.js'

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

/*
// Code I used for adding new user account to my Firebase project.
// It'll be the only account that has write access to Firestore DB.
const CreateAccountForm = document.getElementById('CreateAdminAccount');
CreateAccountForm.addEventListener('submit', e => {
  const email = CreateAccountForm.email.value;
  const password = CreateAccountForm.pw.value;
  console.log(email);
  console.log(password);

  // Create new user.
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log(user);
    // ...
    alert('Account Created!');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // Dump error info
    alert(errorMessage);
  });
});
*/

const SignInForm = document.getElementById('SignIn');
SignInForm.addEventListener('submit', e => {
  const email = SignInForm.email.value;
  const password = SignInForm.pw.value;
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
    console.log(user);
    alert("Sign-in successful");
  })
  .catch((error) => {
    // const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  });
});

