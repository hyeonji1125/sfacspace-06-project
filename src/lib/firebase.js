import dotenv from "dotenv";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { dirname } from "path";
import { fileURLToPath } from "url";

// 현재 파일의 경로를 가져오는 방법 (ES 모듈에서 __dirname 대체)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// dotenv 설정 - 명시적인 경로 지정 (필요하다면)
dotenv.config({ path: `${__dirname}/../../.env` });

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export { analytics, app, db };

console.log(firebaseConfig);

export async function saveToFirestore(data) {
  try {
    const docRef = await addDoc(collection(db, "crawling"), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
