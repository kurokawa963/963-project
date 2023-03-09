// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_SOME_KEY,
    authDomain: "project-cbf66.firebaseapp.com",
    projectId: "project-cbf66",
    storageBucket: "project-cbf66.appspot.com",
    messagingSenderId: "569510321838",
    appId: "1:569510321838:web:9c40e6e2424c982add573f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
export default app;

