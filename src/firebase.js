import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDAdt9FIpp-m2lg4hi5UrDdZG3psocSr6A",
    authDomain: "expense-tracker-2171e.firebaseapp.com",
    projectId: "expense-tracker-2171e",
    storageBucket: "expense-tracker-2171e.firebasestorage.app",
    messagingSenderId: "1061262888145",
    appId: "1:1061262888145:web:e664f9a1f3b48dcef089f0",
    measurementId: "G-JLYWJFP44B"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
