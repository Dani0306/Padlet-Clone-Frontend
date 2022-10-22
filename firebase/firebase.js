import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APP_API_KEY ,
  authDomain: "padlet-clone.firebaseapp.com",
  projectId: "padlet-clone",
  storageBucket: "padlet-clone.appspot.com",
  messagingSenderId: "704361971001",
  appId: "1:704361971001:web:c6ff717ae716a63f2d7ce8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);