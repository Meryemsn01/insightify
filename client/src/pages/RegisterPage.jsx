// Fichier: /client/src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Notre hook magique !

const RegisterPage = () => {
  // 1. Gérer l'état du formulaire
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Pour afficher les erreurs

  // 2. Accéder à notre fonction "register" depuis le contexte
  const { register } = useAuth();
  const navigate = useNavigate(); // Pour rediriger l'utilisateur après l'inscription

  // 3. Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setError(''); // Réinitialiser les erreurs

    if (!email || !password) {
      return setError("Veuillez remplir tous les champs.");
    }
    
    try {
      await register(email, password);
      // Si l'inscription réussit, rediriger vers la page de connexion
      navigate('/login');
    } catch (err) {
      // Si le backend renvoie une erreur (ex: email déjà utilisé), l'afficher
      setError(err.response?.data?.message || "Une erreur est survenue.");
    }
  };

  // 4. Le formulaire en JSX
  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default RegisterPage;