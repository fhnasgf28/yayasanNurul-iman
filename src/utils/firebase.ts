// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket:process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth();

export const SignUp = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(FirebaseAuth, email, password);
}

export const SignIn = async (email: string, password: string) => {
  await signInWithEmailAndPassword(FirebaseAuth, email, password);
}

export const SignOut = async () => {
  await signOut(FirebaseAuth);
};

export const auth = getAuth(firebaseApp);

export default firebaseApp;