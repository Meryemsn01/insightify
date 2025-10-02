// Fichier: /server/controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc    Inscrire un nouvel utilisateur
// @route   POST /api/auth/register
exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Cet utilisateur existe déjà' });
    }

    // Créer une nouvelle instance de l'utilisateur
    user = new User({
      email,
      password,
    });

    // Hacher le mot de passe avant de sauvegarder
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Créer un token JWT (à implémenter plus tard, pour la connexion)
    res.status(201).json({ message: 'Utilisateur créé avec succès' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
};

// @desc    Connecter un utilisateur
// @route   POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Identifiants invalides' }); // Message générique pour la sécurité
    }

    // 2. Comparer le mot de passe fourni avec celui dans la DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Identifiants invalides' });
    }

    // 3. Si tout est bon, créer et renvoyer le token JWT
    const payload = {
      user: {
        id: user.id, // Inclure l'ID de l'utilisateur dans le token
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' }, // Le token expirera dans 5 heures
      (err, token) => {
        if (err) throw err;
        res.json({ token }); // On renvoie le token au client
      }
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
};