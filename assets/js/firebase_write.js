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

document
.getElementById('SignIn')
.addEventListener('submit', e => {
  const email = e.target.email.value;
  const password = e.target.pw.value;
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
    console.log(user);
    alert("LOGIN successful");
    document.querySelector('.login').innerHTML = '<h4>ADMIN LOGIN SUCCESSFUL</h4>';

    const DataInputForm = document.getElementById('DataInput');
    DataInputForm.style.visibility = 'visible';
  })
  .catch((error) => {
    // const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
  });
});

const addDeleteEvent = elem => {
  elem.addEventListener("click", e => {
    if (document.getElementById('workout-items').childElementCount > 1) {
      e.target.parentElement.remove();
    } else {
      alert("You need to submit at least one workout item!");
    }
  });
}

const AddWorkoutItemButton = document.getElementById('AddWorkoutItem');
AddWorkoutItemButton.addEventListener('click', e => {
  const clone = document.querySelector('.workout-item').cloneNode(true);
  document.getElementById('workout-items').appendChild(clone);
  clone.querySelector('.DataString').value = ''; // Empty input field.
  addDeleteEvent(clone.lastElementChild);
});

document
.querySelectorAll("button.DeleteWorkoutItem")
.forEach(addDeleteEvent);
