import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyD60y0FA6ipVxrS4zqxXT793wmlxlVw0kI",
    authDomain: "booknest-4b96d.firebaseapp.com",
    projectId: "booknest-4b96d",
    storageBucket: "booknest-4b96d.firebasestorage.app",
    messagingSenderId: "982018166750",
    appId: "1:982018166750:web:0631aecb4d93388a0ed74f",
    measurementId: "G-8HNL3QFGSL"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;