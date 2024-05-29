// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdTDQGFgJ53Y7x3hYwaZA5_z7zNXfHvyw",
  authDomain: "yt-clone-jea68.firebaseapp.com",
  projectId: "yt-clone-jea68",
  storageBucket: "yt-clone-jea68.appspot.com",
  messagingSenderId: "603771133763",
  appId: "1:603771133763:web:3eb98cc2da082a3e9619f6",
  measurementId: "G-P585KMDK0N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth= getAuth(app);

/**
 * Signs the user in with a Google popup.
 * @returns A promise that resolves with the user's credentials.
 */
export function signInWithGoogle() {
    return signInWithPopup(auth, new GoogleAuthProvider()); // could use other providers
  }
  
  /**
   * Signs the user out.
   * @returns A promise that resolves when the user is signed out.
   */
  export function signOut() {
    return auth.signOut();
  }
  
  /**
   * Trigger a callback when user auth state changes.
   * @returns A function to unsubscribe callback.
   */
  export function onAuthStateChangedHelper(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
  }