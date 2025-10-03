// Fichier: /server/routes/quizRoutes.js
const express = require('express');
const router = express.Router();
const { getQuestions } = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware'); // Notre gardien !

// On applique le middleware "protect" à cette route.
// Seul un utilisateur connecté pourra accéder aux questions.
router.get('/questions', protect, getQuestions);

module.exports = router;