const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const express = require('express');
const { habitatimage } = require('../models/habitatimage');
const router = express.Router();


// requetes base de donnees

async function selectAll()
{
  const requete = "SELECT * FROM habitatimage";

  try {
    const result = await db.query(requete);

    return result;
  } catch (error) {
    let messageError = "error when getting all habitatimage : " + error;
    return messageError;
  }
  
}

async function create(habitatimage) {
  const requete = `INSERT INTO habitatimage 
  ( habitat_id,image_id ) 
  VALUES 
  ('${habitatimage.habitat_id}','${habitatimage.image_id}')`;
  const result = await db.query(
    requete
  );

  let message = 'Error in creating habitatimage';

  if (result.affectedRows) {
    message = 'habitatimage created successfully';
  }

  return { message };
}

async function remove(id) {
  const requete = "DELETE FROM habitatimage WHERE id_habita_image = " + id;
  const result = await db.query(
    requete
  );

  let message = 'Error in removing habitatimage';

  if (result.affectedRows) {
    message = 'habitatimage deleting successfully';
  }

  return { message };

}

async function select(id) {
  const requete = "SELECT * FROM habitatimage WHERE id_habita_image = ?";
  const result = await db.query(
    requete, [id]
  );

  let message = result;

  if (result.affectedRows) {
    message = 'habitatimage created successfully';
  }

  return { message };

}

async function modify(habitatimage) {
  const requete = "UPDATE habitatimage SET path = '" + habitatimage.path + "' WHERE id_habita_image = " + habitatimage.id_habita_image;
  const result = await db.query(
    requete
  );

  let message = result;

  if (result.affectedRows) {
    message = 'habitatimage modified successfully';
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
