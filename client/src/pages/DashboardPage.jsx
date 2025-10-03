// Fichier: /client/src/pages/DashboardPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const DashboardPage = () => {
  const {  logout } = useAuth(); // On récupère la fonction logout et les infos de l'utilisateur
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Appelle la fonction de notre contexte
    navigate('/login'); // Redirige l'utilisateur
  };

  return (
    <div>
      <h1>Tableau de Bord</h1>
      <p>Bienvenue ! Vous êtes connecté.</p>
      {/* On pourrait afficher des infos de l'utilisateur ici plus tard, ex: auth.user.email */}
      
      <button onClick={handleLogout}>
        Déconnexion
      </button>
    </div>
  );
};

export default DashboardPage;