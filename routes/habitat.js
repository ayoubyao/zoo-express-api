const express = require('express');
const router = express.Router();
const habitat = require('../services/habitat');
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


/* POST habitat */
router.post('/', authenticateToken, async function (req, res, next) {
  try {
    res.json(await habitat.create(req.body));
  } catch (err) {
    console.error(`Error while creating habitat `, err.message);
    next(err);
  }
});

/* GET all habitat */
router.get('/', authenticateToken, async function (req, res,) {
  try {
    res.json(await habitat.selectAll());
  } catch (err) {
    console.error(`Error while reading habitat`, err.message);
    next(err);
  }
});

/* GET habitat */
router.get('/:id', authenticateToken, async function (req, res,) {
  try {
    res.json(await habitat.select(req.params.id));
  } catch (err) {
    console.error(`Error while reading habitat`, err.message);
    next(err);
  }
});

router.get('/habitatid/:id', authenticateToken, async function (req, res,) {
  try {
    res.json(await habitat.select(req.params.id));
  } catch (err) {
    console.error(`Error while deleting habitat`, err.message);
    next(err);
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    res.json(await habitat.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting habitat`, err.message);
    next(err);
  }
});

router.put('/', async function (req, res, next) {
  try {
    res.json(await habitat.modify(req.body));
  } catch (err) {
    console.error(`Error while modify habitat`, err.message);
    next(err);
  }


  // Recherche de l'élément dans la liste par son ID
  const languageToUpdate = programmingLanguages.find(lang => lang.id === id);
});

module.exports = router;
