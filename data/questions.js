// Fichier: /server/data/questions.js
const questions = [
  {
    id: 1,
    questionText: "Face à un problème complexe, quelle est votre approche initiale ?",
    answers: [
      { answerText: "Décomposer le problème en petites étapes logiques.", dimension: "logic" },
      { answerText: "Imaginer plusieurs solutions originales, même inhabituelles.", dimension: "creativity" },
      { answerText: "Consulter les autres pour trouver un consensus.", dimension: "pragmatism" }, // Simplifié pour l'exemple
      { answerText: "Agir rapidement avec la première solution qui semble viable.", dimension: "planning" } // Simplifié
    ],
  },
  {
    id: 2,
    questionText: "Votre équipe doit choisir une nouvelle technologie. Que privilégiez-vous ?",
    answers: [
      { answerText: "Une technologie éprouvée et bien documentée.", dimension: "planning" },
      { answerText: "La technologie la plus récente et innovante, même si elle est moins connue.", dimension: "creativity" },
      { answerText: "Celle qui résout le problème le plus efficacement, peu importe sa popularité.", dimension: "logic" },
      { answerText: "Celle qui est la plus facile à adopter pour toute l'équipe.", dimension: "pragmatism" }
    ],
  },
  // Ajoutez d'autres questions sur ce modèle...
];

module.exports = questions;