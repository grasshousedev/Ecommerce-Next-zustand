import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {getFirestore} from "firebase/firestore";

// const app= firebase.initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// })

const app= firebase.initializeApp({
    apiKey: "AIzaSyDQGF-f66wguWQeNGxO964J-WltK9yMOE4",
    authDomain: "chepe-chepe-development.firebaseapp.com",
    projectId: "chepe-chepe-development",
    storageBucket: "chepe-chepe-development.appspot.com",
    messagingSenderId: "276127170850",
    appId: "1:276127170850:web:1656ee5b0522974dd1657b",
    measurementId: "G-BEZRMXCK7Q"
})



export const auth= app.auth()
export const db = getFirestore(app)
export default app 


