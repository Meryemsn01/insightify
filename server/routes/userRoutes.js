// Fichier: /server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// @desc    Obtenir les données de l'utilisateur connecté
// @route   GET /api/users/me
// @access  Privé
router.get('/me', protect, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;