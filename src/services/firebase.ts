// src/services/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';


// ✅ Configuration Firebase officielle
const firebaseConfig = {
  apiKey: 'AIzaSyCIcaV6kxIBdonNTI-jSaCOzb2AJXYODE0',
  authDomain: 'petitpas-54b93.firebaseapp.com',
  databaseURL: 'https://petitpas-54b93-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'petitpas-54b93',
  storageBucket: 'petitpas-54b93.appspot.com', // ✅ Corrigé ici
  messagingSenderId: '326765926412',
  appId: '1:326765926412:web:196eb3552afeb986987629',
};


// 🔥 Initialisation safe (évite les doublons en dev)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const database = getDatabase(app);


// 🔁 Export propre
export { app, auth, database };



