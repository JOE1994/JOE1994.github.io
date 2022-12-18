import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js'

// Add Firebase products that you want to use
// import { getAuth } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js'
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxUl4f1Ly2I3nkYIMGYduP1hwAShCRmm0",
  authDomain: "workoutdiarydb.firebaseapp.com",
  projectId: "workoutdiarydb",
  storageBucket: "workoutdiarydb.appspot.com",
  messagingSenderId: "860001534872",
  appId: "1:860001534872:web:5f83f43b611ef47eede1ed",
  measurementId: "G-XGY5Z9V0W7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Add a new document in collection "cities"

await setDoc(doc(db, "cities", "LA"), {
  name: "Los Angeles",
  state: "CA",
  country: "USA"
});