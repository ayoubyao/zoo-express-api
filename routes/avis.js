const express = require('express');
const router = express.Router();
const avis = require('../services/avis');
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


/* POST avis */
router.post('/', authenticateToken, async function (req, res, next) {
  try {
    res.json(await avis.create(req.body));
  } catch (err) {
    console.error(`Error while creating avis `, err.message);
    next(err);
  }
});

/* GET all avis */
router.get('/', authenticateToken, async function (req, res,) {
  try {
    res.json(await avis.selectAll());
  } catch (err) {
    console.error(`Error while reading avis`, err.message);
    next(err);
  }
});

/* GET avis */
router.get('/:id', authenticateToken, async function (req, res,) {
  try {
    res.json(await avis.select(req.params.id));
  } catch (err) {
    console.error(`Error while reading avis`, err.message);
    next(err);
  }
});

router.get('/avisid/:id', authenticateToken, async function (req, res,) {
  try {
    res.json(await avis.select(req.params.id));
  } catch (err) {
    console.error(`Error while deleting avis`, err.message);
    next(err);
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    res.json(await avis.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting avis`, err.message);
    next(err);
  }
});

router.put('/', async function (req, res, next) {
  try {
    res.json(await avis.modify(req.body));
  } catch (err) {
    console.error(`Error while modify avis`, err.message);
    next(err);
  }


  // Recherche de l'élément dans la liste par son ID
  const languageToUpdate = programmingLanguages.find(lang => lang.id === id);
});

module.exports = router;
