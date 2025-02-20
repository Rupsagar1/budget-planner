// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAUlPIHgmo0VAqNptPLnqbRKN4RgS_Ich4",
    authDomain: "budget-planner-7ca49.firebaseapp.com",
    projectId: "budget-planner-7ca49",
    storageBucket: "budget-planner-7ca49.firebasestorage.app",
    messagingSenderId: "967732397205",
    appId: "1:967732397205:web:9ba52c69570e2ff902879c",
    measurementId: "G-FZFYHEPXJ6"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export Firestore
export { db, collection, addDoc, getDocs, onSnapshot };
