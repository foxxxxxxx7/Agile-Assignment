// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCS4iGOTEdZRCgdrhYsbHaVpf3GFTwuGVw",
  authDomain: "wad2-assignment1.firebaseapp.com",
  projectId: "wad2-assignment1",
  storageBucket: "wad2-assignment1.appspot.com",
  messagingSenderId: "947970668149",
  appId: "1:947970668149:web:f5f7e20d0a111b213e2a3c",
  measurementId: "G-ZR8PM5EFJZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
// const analytics = getAnalytics(app);