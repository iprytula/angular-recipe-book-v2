// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyA7Fw4lxgSLosgO4YXBvKOoNA43l9Lz0yI",
  authDomain: "recipe-book-4f550.firebaseapp.com",
  projectId: "recipe-book-4f550",
  storageBucket: "recipe-book-4f550.appspot.com",
  messagingSenderId: "678754769487",
  appId: "1:678754769487:web:65f52d3029cb29763ce83a",
  measurementId: "G-60NQ9FRF6L"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
