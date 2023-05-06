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
  signInWithEmailAndPassword,
  signOut
} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js'

import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js'

import {firebaseConfig} from './firebase_config.js'

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
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
  e.preventDefault();
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
    if (document.querySelector('#workout-table > tbody').childElementCount > 1) {
      e.target.parentElement.parentElement.remove();
    } else {
      alert("You need to submit at least one workout item!");
    }
  });
}

const AddWorkoutItemButton = document.getElementById('AddWorkoutItem');
AddWorkoutItemButton.addEventListener('click', e => {
  const clone = document.querySelector('.workout-item').cloneNode(true);
  document.querySelector('#workout-table > tbody').appendChild(clone);
  clone.querySelectorAll('input').forEach((input) => {input.value = '';});
  addDeleteEvent(clone.lastElementChild);
});


document
.querySelectorAll("button.DeleteWorkoutItem")
.forEach(addDeleteEvent);

document
.getElementById('DataInput')
.addEventListener('submit', async (e) => {
  e.preventDefault();

  let workout_data = {};
  document
  .querySelectorAll('.workout-item')
  .forEach(row => {
    const row_inputs = row.querySelectorAll('input');
    workout_data[row_inputs.item(0).value] = {
      ...(row_inputs.item(1).value !== '') && { weight: parseInt(row_inputs.item(1).value)},
      reps: row_inputs.item(2).value.split(' ').map(x => parseInt(x)),
    };
  });

  // Submit workout data to firebase DB.
  await setDoc(
    doc(db, "workout-data", new Date().toLocaleDateString('en-ca')),
    workout_data
  ).then(() => {
    alert("Data submitted to database");
  }).catch (error => {
    alert("You need to log-in to submit data");
  });

  signOut(auth).then(() => alert("Signing out for security.."));
});
