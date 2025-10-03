// Fichier: /client/src/context/AuthProvider.jsx
import React, { useState, useEffect  } from 'react';
import { AuthContext } from './AuthContext'; // On importe la "boîte"
import authService from '../services/authService';

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true); 

  // 3. Ajouter ce useEffect
  useEffect(() => {
    // Cette fonction s'exécute une seule fois au chargement de l'application
    const token = localStorage.getItem('token');
    if (token) {
      // Si un token existe, on met à jour notre état d'authentification
      setAuth({ token: token });
    }
    // Dans tous les cas, on a fini de vérifier, donc on arrête le chargement
    setLoading(false);
  }, []);

  const register = async (email, password) => {
    try {
      const response = await authService.register(email, password);
      console.log(response.data.message);
      return response;
    } catch (error) {
      console.error("Erreur d'inscription:", error.response.data.message);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      if (response.data.token) {
        setAuth({ token: response.data.token });
        localStorage.setItem('token', response.data.token);
      }
      return response;
    } catch (error) {
      console.error("Erreur de connexion:", error.response.data.message);
      throw error;
    }
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('token');
  };

  const value = {
    auth,
    loading,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};