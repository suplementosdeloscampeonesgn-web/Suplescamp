import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBqSSGSSv6yJWb_G3YUMeGdFnwpou12sA",
  authDomain: "asesoriasgnwebapp.firebaseapp.com",
  projectId: "asesoriasgnwebapp",
  storageBucket: "asesoriasgnwebapp.firebasestorage.app",
  messagingSenderId: "622314082712",
  appId: "1:622314082712:web:79c2fbfd7db2b42fdb1bed"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
