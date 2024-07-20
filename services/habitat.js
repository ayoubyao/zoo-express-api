const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const express = require('express');
const { habitat } = require('../models/habitat');
const router = express.Router();



// requetes base de donnees
async function selectAll()
{
  const requete = "SELECT * FROM habitat";

  try {
    const result = await db.query(requete);

    return result;
  } catch (error) {
    let messageError = "error when getting all habitat : " + error;
    return messageError;
  }
  
}

async function create(habitat) {
  const requete = `INSERT INTO habitat 
  ( nom,description,commentaire_habitat,image_id ) 
  VALUES 
 ('${habitat.nom}','${habitat.description}','${habitat.commentaire_habitat}','${habitat.image_id}')`;
  const result = await db.query(
    requete
  );

  let message = 'Error in creating habitat';

  if (result.affectedRows) {
    message = 'habitat created successfully';
  }

  return { message };
}

async function remove(id) {
  const requete = "DELETE FROM habitat WHERE habitat_id = " + id;
  const result = await db.query(
    requete
  );

  let message = 'Error in deleting habitat';

  if (result.affectedRows) {
    message = 'habitat created successfully';
  }

  return { message };

}

async function select(id) {
  const requete = "SELECT * FROM habitat WHERE habitat_id = ?";
  const result = await db.query(
    requete, [id]
  );

  let message = result;

  if (result.affectedRows) {
    message = 'habitat created successfully';
  }

  return { message };

}

async function modify(habitat) {
  const requete = "UPDATE habitat SET image_id = '" + habitat.image_id + "' commentaire_habitat = '" + habitat.commentaire_habitat + "' description = '" + habitat.description + "' nom = '" + habitat.nom + "' path = '" + habitat.path + "' WHERE habitat_id = " + habitat.habitatid;
  const result = await db.query(
    requete
  );

  let message = result;

  if (result.affectedRows) {
    message = 'habitat modified successfully';
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
