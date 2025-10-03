// Fichier: /client/src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = () => {
  const { auth, loading } = useAuth(); // 1. Récupérer l'état de chargement

  // 2. Si on est en train de vérifier l'authentification, on affiche un message
  if (loading) {
    return <div>Chargement...</div>;
  }

  // 3. Une fois le chargement terminé, on applique la logique habituelle
  return auth?.token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;