const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const express = require('express');
const { Animal } = require('../models/animal');
const router = express.Router();


// requetes base de donnees
async function selectAll() {
  const requete = "SELECT * FROM animal";

  try {
    const result = await db.query(requete);

    return result;
  } catch (error) {
    let messageError = "error when getting all animals : " + error;
    return messageError;
  }

}

async function create(animal) {
  const requete = `INSERT INTO animal 
  ( prenom,etat,race_id ) 
  VALUES 
  ('${animal.prenom}','${animal.etat}',${animal.race_id})`;
  const result = await db.query(
    requete
  );

  let message = 'Error in creating animal';

  if (result.affectedRows) {
    message = 'animal created successfully';
  }

  return { message };
}

async function remove(id) {
  const requete = "DELETE FROM animal WHERE animal_id = " + id;
  const result = await db.query(
    requete
  );

  let message = 'Error in deleting animal';

  if (result.affectedRows) {
    message = 'animal deleted successfully';
  }

  return { message };

}

async function selectByHabitat(idhabitat)
{
  const requete = "SELECT * FROM animal,image WHERE animal.image_id = image.image_id and habitat_id = ?";
  const animaux = await db.query(
    requete, [idhabitat]
  );

  return { animaux };
}

async function select(id) {
  const requete = "SELECT * FROM animal WHERE animal_id = ?";
  const result = await db.query(
    requete, [id]
  );

  let message = result;

  if (result.affectedRows) {
    message = 'animal created successfully';
  }

  return { message };

}

async function modify(animal) {
  const requete = "UPDATE animal SET etat = '" + animal.etat + "' prenom = '" + animal.prenom + "' race_id = '" + animal.race_id + "' WHERE animal_id = " + animal.animal_id;
  const result = await db.query(
    requete
  );

  let message = result;

  if (result.affectedRows) {
    message = 'animal updated successfully';
  }

  return { message };
}

module.exports = {
  create,
  remove,
  select,
  modify,
  selectAll,
  selectByHabitat
}
