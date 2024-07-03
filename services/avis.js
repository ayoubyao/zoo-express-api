const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const express = require('express');
const { avis } = require('../models/avis');
const router = express.Router();


async function selectAll()
{
  const requete = "SELECT * FROM avis";

  try {
    const result = await db.query(requete);

    return result;
  } catch (error) {
    let messageError = "error when getting all avis : " + error;
    return messageError;
  }
  
}
// requetes base de donnees
async function create(avis) {
  const requete = `INSERT INTO avis 
  ( pseudo,commentaire,isvisible ) 
  VALUES 
 ('${avis.pseudo}','${avis.commentaire}','${avis.isvisible}')`;
  const result = await db.query(
    requete
  );

  let message = 'Error in creating avis';

  if (result.affectedRows) {
    message = 'avis created successfully';
  }

  return { message };
}

async function remove(id) {
  const requete = "DELETE FROM avis WHERE avisid = " + id;
  const result = await db.query(
    requete
  );

  let message = 'Error in creating avis';

  if (result.affectedRows) {
    message = 'avis created successfully';
  }

  return { message };

}

async function select(id) {
  const requete = "SELECT * FROM avis WHERE submenuid = ?";
  const result = await db.query(
    requete, [id]
  );

  let message = result;

  if (result.affectedRows) {
    message = 'avis created successfully';
  }

  return { message };

}

async function modify(avis) {
  const requete = "UPDATE avis SET path = '" + avis.path + "' WHERE avisid = " + avis.avisid;
  const result = await db.query(
    requete
  );

  let message = result;

  if (result.affectedRows) {
    message = 'avis created successfully';
  }

  return { message };
}

module.exports = {
  create,
  remove,
  select,
  modify,
  selectAll
}
