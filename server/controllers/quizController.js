// Fichier: /server/controllers/quizController.js
const questions = require('../data/questions');

// @desc    Récupérer les questions du quiz
// @route   GET /api/quiz/questions
// @access  Privé
exports.getQuestions = (req, res) => {
  // Pour l'instant, on renvoie juste toutes les questions.
  // Plus tard, on pourrait imaginer une logique plus complexe (questions aléatoires, etc.)
  res.status(200).json(questions);
};