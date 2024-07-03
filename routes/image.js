const express = require('express');
const router = express.Router();
const image = require('../services/image');
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


/* POST image */
router.post('/', authenticateToken, async function (req, res, next) {
  try {
    res.json(await image.create(req.body));
  } catch (err) {
    console.error(`Error while creating image `, err.message);
    next(err);
  }
});

/* GET all image */
router.get('/', authenticateToken, async function (req, res,) {
  try {
    res.json(await image.selectAll());
  } catch (err) {
    console.error(`Error while reading image`, err.message);
    next(err);
  }
});

/* GET image */
router.get('/:id', authenticateToken, async function (req, res,) {
  try {
    res.json(await image.select(req.params.id));
  } catch (err) {
    console.error(`Error while reading image`, err.message);
    next(err);
  }
});

router.get('/imageid/:id', authenticateToken, async function (req, res,) {
  try {
    res.json(await image.select(req.params.id));
  } catch (err) {
    console.error(`Error while deleting image`, err.message);
    next(err);
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    res.json(await image.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting image`, err.message);
    next(err);
  }
});

router.put('/', async function (req, res, next) {
  try {
    res.json(await image.modify(req.body));
  } catch (err) {
    console.error(`Error while modify image`, err.message);
    next(err);
  }


  // Recherche de l'élément dans la liste par son ID
  const languageToUpdate = programmingLanguages.find(lang => lang.id === id);
});

module.exports = router;
