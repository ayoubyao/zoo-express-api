const express = require('express');
const security = require('../services/security');
const router = express.Router();
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

// Endpoint d'authentification
router.post('/', async (req, res) => {

  const { username, password } = req.body;

  try {
    let result = await security.authentificate(username, password);
    if (result) {
      res.json(result);
    } else {
      res.status(401).send('Unauthorized');
    }

  } catch (err) {
    console.error(`Error while getting menu `, err.message);
    next(err);
  }


});

module.exports = router;
