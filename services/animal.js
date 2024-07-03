const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const express = require('express');
const { Animal } = require('../models/animal');
const router = express.Router();


// requetes base de donnees
async function selectAll()
{
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

  let message = 'Error in creating animal';

  if (result.affectedRows) {
    message = 'animal created successfully';
  }

  return { message };

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
  const requete = "UPDATE animal SET path = '" + animal.path + "' WHERE animal_id = " + animal.animalid;
  const result = await db.query(
    requete
  );

  let message = result;

  if (result.affectedRows) {
    message = 'animal created successfully';
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
