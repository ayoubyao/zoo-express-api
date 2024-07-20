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
  const requete = "DELETE FROM avis WHERE avis_id = " + id;
  const result = await db.query(
    requete
  );

  let message = 'Error in deleting avis';

  if (result.affectedRows) {
    message = 'avis deleted successfully';
  }

  return { message };

}

async function select(id) {
  const requete = "SELECT * FROM avis WHERE avis_id = ?";
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
  const requete = "UPDATE avis SET isvisible = '" + avis.isvisible + "' commentaire = '" + avis.commentaire + "' pseudo = '" + avis.pseudo + "'  path = '" + avis.path + "' WHERE avis_id = " + avis.avisid;
  const result = await db.query(
    requete
  );

  let message = result;

  if (result.affectedRows) {
    message = 'avis updated successfully';
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
