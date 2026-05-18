import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCslVROOHVISyf5OQ7BM_XMBC6hnUH76Bw",
  authDomain: "zeta-6617b.firebaseapp.com",
  projectId: "zeta-6617b",
  storageBucket: "zeta-6617b.firebasestorage.app",
  messagingSenderId: "18599522056",
  appId: "1:18599522056:web:ec90f46fc10e302a6086bd",
  measurementId: "G-EZ9XHKNCCS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;