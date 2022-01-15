import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCOUvqbIJB48c_Iyx7rhUjQh0AVYn1wpoU",
  authDomain: "concurso-preguntas-respuestas.firebaseapp.com",
  projectId: "concurso-preguntas-respuestas",
  storageBucket: "concurso-preguntas-respuestas.appspot.com",
  messagingSenderId: "682024465271",
  appId: "1:682024465271:web:de72cb54c0cfeebb872772"
};

// Initialize Firebase
const app = !getApps().length? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

export { app, db }