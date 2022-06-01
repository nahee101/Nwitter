/* 🧡 v9 사용 */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

/* 🧡 환경변수 사용(.env) */
/* 반드시 REACT_APP으로 시작! */
/* 깃 버전 관리 대상에 포함되지 않음 */
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

export default app;