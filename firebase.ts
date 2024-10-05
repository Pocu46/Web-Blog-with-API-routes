import { initializeApp } from "firebase/app";
import {getStorage} from "@firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvCJqBSCW3rbxFMr5XA4f3OOUL43u0FnA",
  authDomain: "wfm-js-blog-463dd.firebaseapp.com",
  databaseURL: "https://wfm-js-blog-463dd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "wfm-js-blog-463dd",
  storageBucket: "wfm-js-blog-463dd.appspot.com",
  messagingSenderId: "5572211207",
  appId: "1:5572211207:web:d4586ebc3b8bb1984a30a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);