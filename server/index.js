// Fichier: /server/index.js
require('dotenv').config(); // Charge les variables d'environnement
const express = require('express');
const cors = require('cors');
// Idéalement, la connexion DB serait dans son propre fichier (ex: config/db.js)
const mongoose = require('mongoose');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Pour parser le JSON des requêtes entrantes

// Route de test simple
app.get('/api', (req, res) => {
  res.json({ message: "Bienvenue sur l'API d'Insightify !" });
});

// Définir les routes
app.use('/api/auth', require('./routes/authRoutes'));

const PORT = process.env.PORT || 5000;

// Connexion à MongoDB puis démarrage du serveur
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connecté à MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Erreur de connexion à la base de données', err);
  });