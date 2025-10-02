// Fichier: /server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;

  // Le token sera envoyé dans le header "Authorization" sous la forme "Bearer <token>"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 1. Récupérer le token du header (en enlevant "Bearer ")
      token = req.headers.authorization.split(' ')[1];

      // 2. Vérifier le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Attacher l'utilisateur à la requête
      // On récupère l'utilisateur depuis la DB sans son mot de passe
      req.user = await User.findById(decoded.user.id).select('-password');

      next(); // Passe à la prochaine étape (la route protégée)
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Non autorisé, le token a échoué' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Non autorisé, pas de token fourni' });
  }
};