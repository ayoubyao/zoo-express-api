const express = require('express');
const router = express.Router();
const animal = require('../services/animal');
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


/* POST animal */
router.post('/', authenticateToken, async function (req, res, next) {
  try {
    res.json(await animal.create(req.body));
  } catch (err) {
    console.error(`Error while creating animal `, err.message);
    next(err);
  }
});

/* GET all animal */
router.get('/', authenticateToken, async function (req, res,) {
  try {
    res.json(await animal.selectAll());
  } catch (err) {
    console.error(`Error while reading animal`, err.message);
    next(err);
  }
});

/* GET animal */
router.get('/:id', authenticateToken, async function (req, res,) {
  try {
    res.json(await animal.select(req.params.id));
  } catch (err) {
    console.error(`Error while reading animal`, err.message);
    next(err);
  }
});


router.delete('/:id', async function (req, res, next) {
  try {
    res.json(await animal.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting animal`, err.message);
    next(err);
  }
});

router.put('/', async function (req, res, next) {
  try {
    res.json(await animal.modify(req.body));
  } catch (err) {
    console.error(`Error while modify animal`, err.message);
    next(err);
  }


  // Recherche de l'élément dans la liste par son ID
  const languageToUpdate = programmingLanguages.find(lang => lang.id === id);
});

module.exports = router;
