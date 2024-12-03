import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyByPGenvbIGBokYS1_icCPQhGElerZ1eJ0",
    authDomain: "bettergames-5408f.firebaseapp.com",
    projectId: "bettergames-5408f",
    storageBucket: "bettergames-5408f.firebasestorage.app",
    messagingSenderId: "60164929819",
    appId: "1:60164929819:web:26d30e62968f94c2cb3bbe",
    measurementId: "G-DR2KM217XV"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

export {storage}
