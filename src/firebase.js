import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "project-cbf66.firebaseapp.com",
    projectId: "project-cbf66",
    storageBucket: "project-cbf66.appspot.com",
    messagingSenderId: "569510321838",
    appId: "1:569510321838:web:9c40e6e2424c982add573f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
