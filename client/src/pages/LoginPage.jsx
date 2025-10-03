// Fichier: /client/src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // On utilise toujours notre hook

const LoginPage = () => {
  // 1. Gérer l'état du formulaire
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // 2. Accéder à notre fonction "login" depuis le contexte
  const { login } = useAuth();
  const navigate = useNavigate(); // Pour la redirection

  // 3. Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      // Si la connexion réussit, rediriger vers le tableau de bord
      navigate('/dashboard');
    } catch (err) {
      // Si le backend renvoie une erreur (identifiants invalides), l'afficher
      setError(err.response?.data?.message || "Une erreur est survenue.");
    }
  };

  // 4. Le formulaire en JSX
  return (
    <div>
      <h2>Connexion</h2>
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
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginPage;