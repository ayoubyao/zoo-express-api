const express = require('express');
const router = express.Router();
const race = require('../services/race');
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


/* POST race */
router.post('/', authenticateToken, async function (req, res, next) {
  try {
    res.json(await race.create(req.body));
  } catch (err) {
    console.error(`Error while creating race `, err.message);
    next(err);
  }
});

/* GET all race */
router.get('/', authenticateToken, async function (req, res,) {
  try {
    res.json(await race.selectAll());
  } catch (err) {
    console.error(`Error while reading race`, err.message);
    next(err);
  }
});

/* GET race */
router.get('/:id', authenticateToken, async function (req, res,) {
  try {
    res.json(await race.select(req.params.id));
  } catch (err) {
    console.error(`Error while reading race`, err.message);
    next(err);
  }
});

router.get('/raceid/:id', authenticateToken, async function (req, res,) {
  try {
    res.json(await race.select(req.params.id));
  } catch (err) {
    console.error(`Error while deleting race`, err.message);
    next(err);
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    res.json(await race.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting race`, err.message);
    next(err);
  }
});

router.put('/', async function (req, res, next) {
  try {
    res.json(await race.modify(req.body));
  } catch (err) {
    console.error(`Error while modify race`, err.message);
    next(err);
  }


  // Recherche de l'élément dans la liste par son ID
  const languageToUpdate = programmingLanguages.find(lang => lang.id === id);
});

module.exports = router;
