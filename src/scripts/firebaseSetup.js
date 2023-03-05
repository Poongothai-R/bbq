// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEYzKokd72Rd6pdoiY7EmUtc39yOpg98c",
  authDomain: "bbq-rest.firebaseapp.com",
  projectId: "bbq-rest",
  storageBucket: "bbq-rest.appspot.com",
  messagingSenderId: "406264755699",
  appId: "1:406264755699:web:42e73203f3549efa5a8e86",
  measurementId: "G-DCMKTRB0MX"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const database = getFirestore(firebase);
export const cloudStorage = getStorage(firebase);



