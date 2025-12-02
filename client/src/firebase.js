// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBO3WNFymJDj1YmaRjrZ7J8fLfSkf76FCg",
  authDomain: "i-love-game-sept-2025.firebaseapp.com",
  projectId: "i-love-game-sept-2025",
  storageBucket: "i-love-game-sept-2025.firebasestorage.app",
  messagingSenderId: "809191320974",
  appId: "1:809191320974:web:c8ab66c2da0091c28a48df"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
