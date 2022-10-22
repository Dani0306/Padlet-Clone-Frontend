import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

const provider = new GoogleAuthProvider();

export const signIn = () => signInWithPopup(auth, provider);

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListenner = (callback) => onAuthStateChanged(auth, callback);