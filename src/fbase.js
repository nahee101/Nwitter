/* ๐งก v9 ์ฌ์ฉ */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
/* ๐งก database ์ฌ์ฉ */
// collection -> document์ ๊ทธ๋ฃน
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

/* ๐งก ํ๊ฒฝ๋ณ์ ์ฌ์ฉ(.env) */
/* ๋ฐ๋์ REACT_APP์ผ๋ก ์์! */
/* ๊น ๋ฒ์  ๊ด๋ฆฌ ๋์์ ํฌํจ๋์ง ์์ */
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGIN_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID

};

const app = initializeApp(firebaseConfig);
export const authService = getAuth();
export const dbService = getFirestore();
export const storageService = getStorage();

export default app;