import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAv8W77NdJKlkbzHn5Zvz99oAmgilNI0a4", // Your API Key
  authDomain: "projektperpajisje.firebaseapp.com", // Your Auth Domain
  projectId: "projektperpajisje", // Your Project ID
  storageBucket: "projektperpajisje.appspot.com", // Your Storage Bucket
  messagingSenderId: "248537127666", // Your Messaging Sender ID
  appId: "1:248537127666:android:adbe684dbe8a12ca4c8e6b", // Your App ID
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  auth = getAuth(app);
}

const db = getFirestore(app);

export { app, auth, db };
