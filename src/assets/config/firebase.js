import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB1otzmT1lxBXndWOD66vGJ5VkxcbbF0K8",
    authDomain: "chatroom-a5cfd.firebaseapp.com",
    projectId: "chatroom-a5cfd",
    storageBucket: "chatroom-a5cfd.appspot.com",
    messagingSenderId: "731065234859",
    appId: "1:731065234859:web:f072567e4aedf676758eee",
    measurementId: "G-ZZ49P8VPV5",
    databaseURL: "https://chatroom-a5cfd-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);
export const firebaseAuth = getAuth(firebaseApp);
  
export default firebaseApp