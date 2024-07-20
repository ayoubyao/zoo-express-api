const db = require('./db');
const helper = require('../helper');
const config = require('../config');
const express = require('express');
const { image } = require('../models/image');
const router = express.Router();


// requetes base de donnees

async function selectAll()
{
  const requete = "SELECT * FROM image";

  try {
    const result = await db.query(requete);

    return result;
  } catch (error) {
    let messageError = "error when getting all image : " + error;
    return messageError;
  }
  
}

async function create(image) {
  const requete = `INSERT INTO image 
  ( image_data ) 
  VALUES 
  ('${image.image_data}')`;
  const result = await db.query(
    requete
  );

  let message = 'Error in creating image';

  if (result.affectedRows) {
    message = 'image created successfully';
  }

  return { message };
}

async function remove(id) {
  const requete = "DELETE FROM image WHERE image_id = " + id;
  const result = await db.query(
    requete
  );

  let message = 'Error in deleting image';

  if (result.affectedRows) {
    message = 'image deleted successfully';
  }

  return { message };

}

async function select(id) {
  const requete = "SELECT * FROM image WHERE image_id = ?";
  const result = await db.query(
    requete, [id]
  );

  let message = result;

  if (result.affectedRows) {
    message = 'image created successfully';
  }

  return { message };

}

async function modify(image) {
  const requete = "UPDATE image SET image_data = '" + image.image_data + "' path = '" + image.path + "' WHERE image_id = " + image.image_id;
  const result = await db.query(
    requete
  );

  let message = result;

  if (result.affectedRows) {
    message = 'image modified successfully';
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
