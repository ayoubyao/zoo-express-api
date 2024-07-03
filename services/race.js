const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const express = require('express');
const { race } = require('../models/race');
const router = express.Router();


// requetes base de donnees

async function selectAll()
{
  const requete = "SELECT * FROM race";

  try {
    const result = await db.query(requete);

    return result;
  } catch (error) {
    let messageError = "error when getting all race : " + error;
    return messageError;
  }
  
}

async function create(race) {
  const requete = `INSERT INTO race 
  ( label ) 
  VALUES 
  ('${race.label}')`;
  const result = await db.query(
    requete
  );

  let message = 'Error in creating race';

  if (result.affectedRows) {
    message = 'race created successfully';
  }

  return { message };
}

async function remove(id) {
  const requete = "DELETE FROM race WHERE raceid = " + id;
  const result = await db.query(
    requete
  );

  let message = 'Error in creating race';

  if (result.affectedRows) {
    message = 'race created successfully';
  }

  return { message };

}

async function select(id) {
  const requete = "SELECT * FROM race WHERE submenuid = ?";
  const result = await db.query(
    requete, [id]
  );

  let message = result;

  if (result.affectedRows) {
    message = 'race created successfully';
  }

  return { message };

}

async function modify(race) {
  const requete = "UPDATE race SET path = '" + race.path + "' WHERE raceid = " + race.raceid;
  const result = await db.query(
    requete
  );

  let message = result;

  if (result.affectedRows) {
    message = 'race created successfully';
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
