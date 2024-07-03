const express = require('express');
const router = express.Router();
const habitatimage = require('../services/habitatimage');
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


/* POST habitatimage */
router.post('/', authenticateToken, async function (req, res, next) {
  try {
    res.json(await habitatimage.create(req.body));
  } catch (err) {
    console.error(`Error while creating habitatimage `, err.message);
    next(err);
  }
});

/* GET all habitatimage */
router.get('/', authenticateToken, async function (req, res,) {
  try {
    res.json(await habitatimage.selectAll());
  } catch (err) {
    console.error(`Error while reading habitatimage`, err.message);
    next(err);
  }
});

/* GET habitatimage */
router.get('/:id', authenticateToken, async function (req, res,) {
  try {
    res.json(await habitatimage.select(req.params.id));
  } catch (err) {
    console.error(`Error while reading habitatimage`, err.message);
    next(err);
  }
});

router.get('/habitatimageid/:id', authenticateToken, async function (req, res,) {
  try {
    res.json(await habitatimage.select(req.params.id));
  } catch (err) {
    console.error(`Error while deleting habitatimage`, err.message);
    next(err);
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    res.json(await habitatimage.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting habitatimage`, err.message);
    next(err);
  }
});

router.put('/', async function (req, res, next) {
  try {
    res.json(await habitatimage.modify(req.body));
  } catch (err) {
    console.error(`Error while modify habitatimage`, err.message);
    next(err);
  }


  // Recherche de l'élément dans la liste par son ID
  const languageToUpdate = programmingLanguages.find(lang => lang.id === id);
});

module.exports = router;
