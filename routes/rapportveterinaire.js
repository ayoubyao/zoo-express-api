const express = require('express');
const router = express.Router();
const rapportveterinaire = require('../services/rapportveterinaire');
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


/* POST rapportveterinaire */
router.post('/', authenticateToken, async function (req, res, next) {
  try {
    res.json(await rapportveterinaire.create(req.body));
  } catch (err) {
    console.error(`Error while creating rapportveterinaire `, err.message);
    next(err);
  }
});

/* GET all rapportveterinaire */
router.get('/', authenticateToken, async function (req, res,) {
  try {
    res.json(await rapportveterinaire.selectAll());
  } catch (err) {
    console.error(`Error while reading rapportveterinaire`, err.message);
    next(err);
  }
});


/* GET rapportveterinaire */
router.get('/:id', authenticateToken, async function (req, res,) {
  try {
    res.json(await rapportveterinaire.select(req.params.id));
  } catch (err) {
    console.error(`Error while reading rapportveterinaire`, err.message);
    next(err);
  }
});

router.get('/rapportveterinaireid/:id', authenticateToken, async function (req, res,) {
  try {
    res.json(await rapportveterinaire.select(req.params.id));
  } catch (err) {
    console.error(`Error while deleting rapportveterinaire`, err.message);
    next(err);
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    res.json(await rapportveterinaire.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting rapportveterinaire`, err.message);
    next(err);
  }
});

router.put('/', async function (req, res, next) {
  try {
    res.json(await rapportveterinaire.modify(req.body));
  } catch (err) {
    console.error(`Error while modify rapportveterinaire`, err.message);
    next(err);
  }


  // Recherche de l'élément dans la liste par son ID
  const languageToUpdate = programmingLanguages.find(lang => lang.id === id);
});

module.exports = router;
