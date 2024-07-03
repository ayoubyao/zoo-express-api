const express = require('express');
const router = express.Router();
const role = require('../services/role');
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


/* POST role */
router.post('/', authenticateToken, async function (req, res, next) {
  try {
    res.json(await role.create(req.body));
  } catch (err) {
    console.error(`Error while creating role `, err.message);
    next(err);
  }
});

/* GET all role */
router.get('/', authenticateToken, async function (req, res,) {
  try {
    res.json(await role.selectAll());
  } catch (err) {
    console.error(`Error while reading role`, err.message);
    next(err);
  }
});

/* GET role */
router.get('/:id', authenticateToken, async function (req, res,) {
  try {
    res.json(await role.select(req.params.id));
  } catch (err) {
    console.error(`Error while reading role`, err.message);
    next(err);
  }
});

router.get('/roleid/:id', authenticateToken, async function (req, res,) {
  try {
    res.json(await role.select(req.params.id));
  } catch (err) {
    console.error(`Error while deleting role`, err.message);
    next(err);
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    res.json(await role.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting role`, err.message);
    next(err);
  }
});

router.put('/', async function (req, res, next) {
  try {
    res.json(await role.modify(req.body));
  } catch (err) {
    console.error(`Error while modify role`, err.message);
    next(err);
  }


  // Recherche de l'élément dans la liste par son ID
  const languageToUpdate = programmingLanguages.find(lang => lang.id === id);
});

module.exports = router;
