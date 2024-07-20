const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const express = require('express');
const { habitat } = require('../models/habitat');
const router = express.Router();



// requetes base de donnees
async function selectAll() {
  const requete = "SELECT * FROM habitat,image WHERE habitat.image_id = image.image_id";

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
  const requete = "SELECT * FROM habitat WHERE submenuid = ?";
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
  const requete = "UPDATE habitat SET path = '" + habitat.path + "' WHERE habitatid = " + habitat.habitatid;
  const result = await db.query(
    requete
  );

  let message = result;

  if (result.affectedRows) {
    message = 'habitat created successfully';
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
