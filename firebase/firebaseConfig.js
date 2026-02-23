import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAdoV3fhlxjmPirZKCGqlYezLq52Ys67Hw",
  authDomain: "gestorvideos.firebaseapp.com",
  projectId: "gestorvideos",
  storageBucket: "gestorvideos.firebasestorage.app",
  messagingSenderId: "756177286268",
  appId: "1:756177286268:web:04221b665c1a1c2ac245f9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
