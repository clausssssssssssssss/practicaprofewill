// Configuración de Firebase para la aplicación
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAfiwdVZ9Z7YYYDYDVzX483mG-ropeVcyw",
  authDomain: "practicaclaudiaallan.firebaseapp.com",
  projectId: "practicaclaudiaallan",
  storageBucket: "practicaclaudiaallan.firebasestorage.app",
  messagingSenderId: "596044171048",
  appId: "1:596044171048:web:fd5af008344e9d8975f21d"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios de Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);

console.log('🔥 Firebase configurado correctamente');
console.log('🔐 Auth disponible:', !!auth);
console.log('💾 Firestore disponible:', !!db);

export default app;