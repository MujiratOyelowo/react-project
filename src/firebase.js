import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyCHQupKKWIeJvBL7CItQYVDkH2ioMScyEA",
  authDomain: "website-assignment-336da.firebaseapp.com",
  projectId: "website-assignment-336da",
  storageBucket: "website-assignment-336da.firebasestorage.app",
  messagingSenderId: "251346372536",
  appId: "1:251346372536:web:1bd413585dd19593a6f14d",
  measurementId: "G-VN1P2DXG8W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth();

export { db, auth };