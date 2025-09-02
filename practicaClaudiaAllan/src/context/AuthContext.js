import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const register = async (email, password, userInfo) => {
    try {
      console.log('Intentando registrar usuario:', email);
      
      if (!auth) {
        throw new Error('Firebase Auth no está disponible');
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('Usuario creado exitosamente:', user.uid);

      try {
        await updateProfile(user, {
          displayName: userInfo.nombre
        });
        console.log('Perfil actualizado exitosamente');
      } catch (profileError) {
        console.warn('Error al actualizar perfil:', profileError);
      }

      try {
        await setDoc(doc(db, 'users', user.uid), {
          nombre: userInfo.nombre,
          email: email,
          edad: userInfo.edad,
          especialidad: userInfo.especialidad,
          createdAt: new Date()
        });
        console.log('Datos guardados en Firestore exitosamente');
      } catch (firestoreError) {
        console.warn('Error al guardar en Firestore:', firestoreError);
      }

      return userCredential;
    } catch (error) {
      console.error('Error completo en registro:', error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };

  const updateUserData = async (userId, newData) => {
    try {
      await setDoc(doc(db, 'users', userId), newData, { merge: true });
      setUserData(prev => ({ ...prev, ...newData }));
    } catch (error) {
      throw error;
    }
  };

  const fetchUserData = async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (!auth) {
      console.log('Auth no está disponible aún');
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('Estado de autenticación cambiado:', user ? 'Usuario logueado' : 'Usuario no logueado');
      setCurrentUser(user);
      if (user) {
        await fetchUserData(user.uid);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    register,
    login,
    logout,
    updateUserData,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};