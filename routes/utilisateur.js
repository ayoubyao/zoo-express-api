const express = require('express');
const router = express.Router();
const utilisateur = require('../services/utilisateur');
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) {
      return res.sendStatus(401);
    }
    req.user = user;
    next();
  });
};


/* POST utilisateur */
router.post('/', authenticateToken, async function (req, res, next) {
  try {
    res.json(await utilisateur.create(req.body));
  } catch (err) {
    console.error(`Error while creating utilisateur `, err.message);
    next(err);
  }
});

/* GET all utilisateur */
router.get('/', authenticateToken, async function (req, res,) {
  try {
    res.json(await utilisateur.selectAll());
  } catch (err) {
    console.error(`Error while reading utilisateur`, err.message);
    next(err);
  }
});

/* GET utilisateur */
router.get('/:id', authenticateToken, async function (req, res,) {
  try {
    res.json(await utilisateur.select(req.params.id));
  } catch (err) {
    console.error(`Error while reading utilisateur`, err.message);
    next(err);
  }
});

router.get('/utilisateurid/:id', authenticateToken, async function (req, res,) {
  try {
    res.json(await utilisateur.select(req.params.id));
  } catch (err) {
    console.error(`Error while deleting utilisateur`, err.message);
    next(err);
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    res.json(await utilisateur.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting utilisateur`, err.message);
    next(err);
  }
});

router.put('/', async function (req, res, next) {
  try {
    res.json(await utilisateur.modify(req.body));
  } catch (err) {
    console.error(`Error while modify utilisateur`, err.message);
    next(err);
  }


  // Recherche de l'élément dans la liste par son ID
  const languageToUpdate = programmingLanguages.find(lang => lang.id === id);
});

module.exports = router;
