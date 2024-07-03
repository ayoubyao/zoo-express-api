const express = require('express');
const router = express.Router();
const services = require('../services/service');
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


/* POST services */
router.post('/', authenticateToken, async function (req, res, next) {
  try {
    res.json(await services.create(req.body));
  } catch (err) {
    console.error(`Error while creating services `, err.message);
    next(err);
  }
});

/* GET all services */
router.get('/', authenticateToken, async function (req, res,) {
  try {
    res.json(await service.selectAll());
  } catch (err) {
    console.error(`Error while reading service`, err.message);
    next(err);
  }
});

/* GET services */
router.get('/:id', authenticateToken, async function (req, res,) {
  try {
    res.json(await services.select(req.params.id));
  } catch (err) {
    console.error(`Error while reading services`, err.message);
    next(err);
  }
});

router.get('/servicesid/:id', authenticateToken, async function (req, res,) {
  try {
    res.json(await services.select(req.params.id));
  } catch (err) {
    console.error(`Error while deleting services`, err.message);
    next(err);
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    res.json(await services.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting services`, err.message);
    next(err);
  }
});

router.put('/', async function (req, res, next) {
  try {
    res.json(await services.modify(req.body));
  } catch (err) {
    console.error(`Error while modify services`, err.message);
    next(err);
  }


  // Recherche de l'élément dans la liste par son ID
  const languageToUpdate = programmingLanguages.find(lang => lang.id === id);
});

module.exports = router;
